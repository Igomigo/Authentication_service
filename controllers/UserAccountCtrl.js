// Contains the user account controller

const auth = require("../auth/auth");

exports.account = async (req, res) => {
    // Returns account details for a logged in user
    // It receives a get requests.
    try {
        if (req.current_user) {
            const user = req.current_user;
            res.status(200).json({
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(404).json("No session found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json("An error occured");
    }
}