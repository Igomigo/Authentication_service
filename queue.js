// This module initializes and creates a queue

const kue = require("kue");
const queue = kue.createQueue();

// shutdown gracefully
process.once("SIGTERM", () => {
    queue.shutdown(5000, (err) => {
        console.log("Kue shutdown: ", err || "");
        process.exit(0); 
    });
});

module.exports = queue;