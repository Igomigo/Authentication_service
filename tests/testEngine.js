// Testing the engine.js module methods and functionality
console.log("Starting database connection....");

const mongoose = require("mongoose");
const engine = require("../auth/dbEngine");

main().catch(err => console.error(err));

async function main() {
    console.log("connecting...");
    await mongoose.connect("mongodb://127.0.0.1:27017/authTestDb");
    console.log("connected to mongodb successfully :)");
    await createUser();
    await findUser();
    await updateUser();
    console.log("Operation completed successfully");
    mongoose.connection.close();
    console.log("Connection closed successfully");
}

async function createUser() {
    console.log("Creating user...");
    try {
        const user = await engine.add_user("fatai", "fatai@mail", "fatai");
        console.log(`User ${user.username} created successfully`);
    } catch (err) {
        console.log(`An error occured: ${err}`);
    }
}

async function findUser() {
    console.log("Locating user...");
    try {
        const user = await engine.find_user_by("fatai@mail");
        console.log(`User with mail ${user.email} found`);
    } catch (err) {
        console.log(`An error occured: ${err}`);
    }
}

async function updateUser() {
    console.log("Updating user...");
    try {
        const user = await engine.find_user_by("fatai@mail");
        const newUser = await engine.update_user(
            user._id, {session_id: "1234"});
        console.log(`User session id updated to ${newUser.session_id}`);
    } catch (err) {
        console.log(`An error occured: ${err}`);
    }
}
