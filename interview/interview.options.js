const { Interview } = require("./interview.model");
const { hiringMenu } = require("../common/navigation");

const InterviewResourceOptions = {
    resource: Interview,
    options: {
        navigation: hiringMenu,
        properties: {
            _id: {
                isVisible: false
            },
            candidateId: {
                reference: 'Candidate'
            },
        },
    }
}

module.exports = {
    InterviewResourceOptions
}