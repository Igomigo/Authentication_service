/**
 * The upper level abstraction class that utilizes the
 * dbEngine lowerlevel abstraction class in authenticating a user.
 */

const engine = require("../auth/dbEngine");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

function generate_session_id () {
    // Genetrates session id
    const session_id = uuidv4();
    return session_id;
}

async function hash_pwd (pwd) {
    // Hashes user password
    const hashed = await bcrypt.hash(pwd, 10);
    return hashed;
}

exports.register_user = async (username, email, pwd) => {
    // Registers a user to the database
    try {
        const user = await engine.find_user_by({email: email});
        if (!user) {
            const hashedPwd = await hash_pwd(pwd);
            const newUser = await engine.add_user(username, email, hashedPwd);
            return newUser;
        } else {
            throw new Error(`user with email <${email}> already exists`);
        } 
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.is_valid_pwd = async (email, password) => {
    // Validates that a password is correct and corresponds with the hashed
    try {
        const user = await engine.find_user_by({email: email});
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error(`User with email <${email}> not found`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.create_session = async (email) => {
    // Creates a session id and stores it in the database
    try {
        const user = await engine.find_user_by({email: email});
        if (user) {
            const session_id = generate_session_id();
            await engine.update_user(user._id, {session_id: session_id});
            return session_id;
        } else {
            throw new Error(`User with email <${email}> not found`);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.delete_session = async (id) => {
    // Changes the session_id to none useful for logout operations
    try {
        await engine.update_user(id, {session_id: null});
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.get_user_from_session = async (session_id) => {
    // Returns the user object with the passed session id
    // This will be used in the middleware designed to protect specific routes
    try {
        const user = await engine.find_user_by({session_id: session_id});
        const msg = `user with session_id <${session_id}> not found`;
        if (!user) throw new Error(msg);
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}