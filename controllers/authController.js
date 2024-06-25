// Authentication Controllers

const auth = require("../auth/auth");
const sendRegisterMail = require("../jobs/emailJob");

exports.register = async (req, res) => {
    // Handles POST request to register a user to the server
    try {
        const {username, email, password} = req.body;
        if (username && email && password) {
            const user = await auth.register_user(
                username, email, password
            );
            res.status(201).json({
                status: "success",
                message: `User with email <${user.email}> registered successfully`,
            });
            // Process email response in the background and send to user
            sendRegisterMail(email, "register-email", username)
            .catch(err => {
                console.error(`Failed to send registration email: ${err}`);
            });
        } else {
            res.status(400).json({
                status: "error",
                message: "Bad credentials"
            });
        }
    } catch (err) {
        console.error(err);
        if (err.message.includes("already exists")) {
            res.status(409).json({
                status: "error",
                message: "User already exists, use a different email"
            });
        } else {
            res.status(500).json("An error occured");
        }
    }
}

exports.login = async (req, res) => {
    // Handles POST request to log a user in
    try {
        const {email, password} = req.body;
        if (email, password) {
            if (await auth.is_valid_pwd(email, password)) {
                const session_id = await auth.create_session(email);
                res.cookie("session_id", session_id);
                const user = await auth.get_user_from_session(session_id);
                res.status(200).json({
                    status: "success",
                    message: `User with email <${email}> logged in successfully`,
                    user: user
                });
            } else {
                res.status(403).json({
                    status: "error",
                    message: `Password incorrect`
                });               
            }
        } else {
            res.status(400).json({
                status: "error",
                message: "Email and password are required"
            });
        }
    } catch (err) {
        console.error(err);
        if (err.message.includes("not found")) {
            res.status(404).json("User not found");
            res.redirect("/auth/register");
        } else {
            res.status(500).json("An error occured");
        }
    }
}

exports.logout = async (req, res) => {
    // Handles POST requests to log a user out
    try {
        const session_id = req.cookies.session_id;
        if (session_id) {
            const user = await auth.get_user_from_session(session_id);
            await auth.delete_session(user._id);
            res.status(200).json({
                status: "success",
                message: `Successfully logged out user with email: ${user.email}`
            })
        } else {
            res.status(400).json("No session found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("An error occured");
    }
}