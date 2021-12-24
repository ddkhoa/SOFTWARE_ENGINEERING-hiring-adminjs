const express = require("express");
const router = express.Router();
const sender = require("./email.sender");
router.post("/sendEmail", function (req, res, next) {

    try {

        const sendEmailRequest = {
            receivers: req.body.receivers,
            subject: req.body.subject,
            body: req.body.body,
        }

        sender.sendEmail(sendEmailRequest);

        res.json({ success: true });
    } catch (error) {

        next(error);
    }
})

module.exports = router;