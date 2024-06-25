/**
 * Implementing a queue job for updating the redis cache
 * with the data necessary for generating the users account
 */

const queue = require("../queue");
const client = require("../config/redisClient");

 
async function redisStoreUserData(data) {
    // extract the user data from the data object
    const {username, email} = data;
    
    console.log("Redis store job creation is loading...");
    return new Promise((resolve, reject) => {
        // create the job on the queue
        const job = queue.create("redisStoreUserData", {
            title: "Store user account data in redis dbs",
            username: username,
            email: email
        }).save((err) => {
            if (err) {
                console.error(
                    `Failed to save redis store job in the que: ${err}`);
                return reject(err);
            }
            console.log("Redis user data store job created");

            // Attach event listeners to the job
            job.on("complete", (result) => {
                console.log("Job completed successfully");
                resolve();
            }).on("failed", (err) => {
                console.log("Job failed to complete", err);
                reject(err);
            });
        });
    });
}

// A queue to process the redis store job
queue.process("redisStoreUserData", async (job, done) => {
    const data = job.data;
    try {
        await storeData(data);
        console.log("User data stored in Redis successfully:", job.id);
        done();
    } catch (err) {
        console.error(`Error while storing user data to Redis: ${err}`);
        done(err);
    }
});

async function storeData(data) {
    // store the user data in redis
    const user = `user:${data.email}`;
    try {
        await client.hSet(user, "username", data.username);
        await client.hSet(user, "email", data.email);
        console.log(
            `RedisStore: User data for user <${user}> set to redis successfully`);
    } catch (err) {
        console.error(
            `Error while storing user data hash in redis ${err} for ${user}`);
    }
}

module.exports = redisStoreUserData;