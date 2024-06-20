/**
 * gets the session id from request cookie and
 * populates the req.current_user object with the
 * user data corresponding to the specific user.
 * 
 * It also calls the queue function that triggers
 * a background process to store user data in the
 * redis cache for quick retrieval.
 * 
 * It checks if the data is already cached in redis before
 * storing this data. 
 */

const auth = require("./auth");
const client = require("../config/redisClient");
const redisStoreUserData = require("../jobs/redisStoreJob");

const authenticate = async (req, res, next) => {
    try {
        const session_id = req.cookies.session_id;
        if (session_id) {
            let user = await auth.get_user_from_session(session_id);
            if (user) {
                req.current_user = user;
                // construct the hash key
                const key = `user:${user.email}`;
                const userData = await client.hGetAll(key);
                if (Object.keys(userData).length === 0) {
                    try {
                        await redisStoreUserData(user);
                    } catch (err) {
                        console.log(`RedisJob: Failed to store user data hash ${err}`);
                    }
                }
                // Uncomment the following code to check if the data is already cached in redis
                //const updatedUserData = await client.hGetAll(key);
                //if (Object.keys(updatedUserData).length !== 0) {
                //    console.log(`Data retrieved from the redis cache: ${JSON.stringify(updatedUserData)}`);
                //} else {
                //    console.log("No data found in the redis cache after job processing");
                //}

                next();
            } else {
                res.redirect("/auth/login");
            }
        } else {
            res.redirect("/auth/login");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "An error occured while authenticating the user"
        });
    }
}

module.exports = authenticate;