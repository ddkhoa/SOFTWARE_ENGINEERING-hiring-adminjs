const { countCandidateByPosition,
    countCandidateByStage } = require("../candidate/candidate.model");
const { countPosition } = require("../position/position.model");

async function getStats() {

    const candidateByPosition = await countCandidateByPosition();
    const candidateByStage = await countCandidateByStage();
    const positionCount = await countPosition();
    const candidateCount = candidateByPosition.map(item => item.count).reduce((prev, next) => prev + next);
    const hiredCount = candidateByStage.find(item => item._id === "HIRED")?.count || 0;

    return {
        candidateByPosition,
        candidateByStage,
        positionCount,
        candidateCount,
        hiredCount
    }
}

module.exports = {
    getStats
}