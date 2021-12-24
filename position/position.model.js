const mongoose = require('mongoose');
const PositionSchema = new mongoose.Schema({
    name: { type: String },
});
const Position = mongoose.model('Position', PositionSchema);

module.exports = {
    PositionSchema,
    Position,
    countPosition
}

async function countPosition() {
    return await Position.count();
}