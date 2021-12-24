const mongoose = require('mongoose');
const InterviewSchema = new mongoose.Schema({
    candidateId: { type: String, ref: 'Candidate' },
    date: { type: Date },
});
const Interview = mongoose.model('Interview', InterviewSchema);

module.exports = {
    InterviewSchema,
    Interview
}   