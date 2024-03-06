const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (recipient, subject, message, callback) => {
    const transporter = nodemailer.createTransport({
        // Configure SMTP transporter
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        secure: true,
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: recipient,
        subject,
        // html: message,
        text: message,
    };

    transporter.sendMail(mailOptions, callback);
};

const notification = {};

module.exports = {
    sendEmail,
    notification,
};
