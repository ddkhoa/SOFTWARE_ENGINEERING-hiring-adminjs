const nodemailer = require("nodemailer");
const config = require("../config");
const transporter = nodemailer.createTransport({
    host: config.sender_host,
    port: config.sender_port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.sender_address,
        pass: config.sender_password
    }
});

module.exports = {

    sendEmail: function (params) {
        let { receivers, subject, body } = params;
        const mailOptions = {
            from:
            {
                name: config.sender_name,
                address: config.sender_address,
            },
            to: receivers,
            subject: subject,
            html: body
        };
        transporter.sendMail(mailOptions)
            .then(() => {
                console.log("Email sent");
            })
            .catch(error => {
                console.log(`Error when send email : ${error.message}`);
            });
    },


};