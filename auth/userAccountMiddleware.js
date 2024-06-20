// This middleware retrieves and renders user account
// related data from the redis cache for populating the
// user account page.

const client = require("../config/redisClient");

async function getUserData(req, res, next) {
    try {
        // retrieve user data from the current_user object
        const user = req.current_user;
        // construct hash key to retrieve the specific user data
        const key = `user:${user.email}`;
        // query the cache
        const retrievedUser = await client.hGetAll(key);
        if (Object.keys(retrievedUser).length !== 0) {
            console.log("UserAccountMiddleware: user data retrieved\
                from redis cache successfully");
            res.status(200).json(retrievedUser);
        }
    } catch(err) {
        console.error(`UserAccountMiddleware: Error while retrieving user data: ${err}`);
        res.status(500).json({
            error: "An error occured while retrieving user data"
        });
    }
}


module.exports = getUserData;