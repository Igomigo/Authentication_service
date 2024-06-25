// Setting up the email processing emailDatas for the application
const app = require("../app");
const queue = require("../queue");
const dotenv = require("dotenv").config();
const pug = require("pug");
const nodemailer = require("nodemailer");

const registerMail = (to, template, username) => {
    return new Promise((resolve, reject) => {
        queue.create("email", {
            title: "Register email",
            template: template,
            to: to,
            username: username
        }).save((err) => {
            if (err) {
                console.error(`An error occured ${err}`);
                return reject(err);
            }
            console.log("Email job created successfully");
            resolve();
        });
    });  
}

queue.process("email", (job, done) => {
    const emailData = job.data;
    console.log("preparing html email template");
    const html = pug.renderFile(
        `./templates/${emailData.template}.pug`, {
            username: emailData.username,
            title: emailData.title
        });

    console.log("sending email to:", emailData.to);
    sendEmail(emailData.to, html, (err) => {
        if (err) {
            console.log("An error occured", err);
            return done(err);
        }
        console.log("Email sent successfully");
        done();
    });
});

function sendEmail(to, template, callback) {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: "Welcome!",
        html: template
    }

    transporter.sendMail(mailOptions, callback);
}


module.exports = registerMail;