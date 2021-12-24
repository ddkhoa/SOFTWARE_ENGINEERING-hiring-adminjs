const mongoose = require('mongoose');
const CandidateSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    position: { type: mongoose.Types.ObjectId, ref: 'Position' },
    currentStage: { type: String },
    note: { type: String },
    // applyDate: {type: Date}
});
const Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = {
    CandidateSchema,
    Candidate,
    countCandidateByPosition,
    countCandidateByStage
}

async function countCandidateByPosition() {

    const aggregatorOpts = [

        // count by position id
        {
            $group: {
                _id: "$position",
                count: { $sum: 1 }
            }
        },
        // join position table, positionData is an array that always contains only 1 value
        {
            $lookup:
            {
                from: "positions",
                localField: "_id",
                foreignField: "_id",
                as: "positionData"
            }
        },
        {
            $addFields: {
                positionName: { $arrayElemAt: ["$positionData.name", 0] }
            }
        },
    ];

    const data = await Candidate.aggregate(aggregatorOpts).exec()

    return data;
}

async function countCandidateByStage() {

    const aggregatorOpts = [

        // count by position id
        {
            $group: {
                _id: "$currentStage",
                count: { $sum: 1 }
            }
        },
    ];

    const data = await Candidate.aggregate(aggregatorOpts).exec()

    return data;

}