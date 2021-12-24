const mongoose = require('mongoose');
const EmailSchema = new mongoose.Schema({
    name: { type: String },
    subject: { type: String },
    body: { type: String },
});
const Email = mongoose.model('Email', EmailSchema);

module.exports = {
    EmailSchema,
    Email
}