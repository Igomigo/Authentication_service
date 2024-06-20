// Contains code that connects to the redis server

const redis = require("redis");
const client = redis.createClient(6397);

console.log("Establishing a connection to the redis server...");

client.on("connect", () => {
    console.log("Redis client connected to the server");
});

client.on("error", (err) => {
    console.log(`Client failed to connect to the server: ${err}`);
});

client.connect();

module.exports = client;