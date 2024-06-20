/**
 * This module contains the authentication class
 *
 */

const User = require("../models/user");

exports.add_user = async (username, email, hashpwd) => {
    // Creates a user object and stores it in the database
    try {
        if (username && email && hashpwd) {
            const newUser = new User({
                username: username,
                email: email,
                password: hashpwd
            });
    
            await  newUser.save();
            return newUser;
        } else {
            throw new Error("Some arguments are missing");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.find_user_by = async (object) => {
    // Finds and returns a user from the database by email
    try {
        if (object) {
            const user = await User.findOne(object);
            return user;
        } else {
            throw new Error("object missing");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.update_user = async (id, update) => {
    // Updates a user 
    try {
        if (id) {
            const user = await User.findByIdAndUpdate(id, {$set: update}, {new: true});
            if (user) {
                return user;
            } else {
                throw new Error("User not found");
            }
        } else {
            throw new Error("Id missing");
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}