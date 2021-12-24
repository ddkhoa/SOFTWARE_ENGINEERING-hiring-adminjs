const AdminJS = require('adminjs');
const { Candidate } = require("./candidate.model");
const { hiringMenu } = require("../common/navigation");

const isCheckingCV = ({ record }) => {
    return record.params.currentStage === "CHECK_CV" ||
        !record.params.currentStage;
}
const cvResponseHandler = (request, response, context) => {
    const candidate = context.record;
    return {
        record: candidate.toJSON(),
    }
};
const isInterviewing = ({ record }) => {
    return record.params.currentStage === "INTERVIEW";
}

const afterInterviewHandler = (request, response, context) => {
    const candidate = context.record;
    return {
        record: candidate.toJSON(),
    }
};

const CandidateResourceOptions = {
    resource: Candidate,
    options: {
        navigation: hiringMenu,
        actions: {
            RejectCV: {
                actionType: 'record',
                icon: 'View',
                isVisible: isCheckingCV,
                handler: cvResponseHandler,
                component: AdminJS.bundle('../public/pages/cv-response'),
            },
            PassToInterview: {
                actionType: 'record',
                icon: 'View',
                isVisible: isCheckingCV,
                handler: cvResponseHandler,
                component: AdminJS.bundle('../public/pages/cv-response'),
            },
            DeclineAfterInterview: {
                actionType: 'record',
                icon: 'View',
                isVisible: isInterviewing,
                handler: afterInterviewHandler,
                component: AdminJS.bundle('../public/pages/interview-response'),
            },
            AcceptAfterInterview: {
                actionType: 'record',
                icon: 'View',
                isVisible: isInterviewing,
                handler: afterInterviewHandler,
                component: AdminJS.bundle('../public/pages/interview-response'),
            }
        },
        properties: {
            _id: {
                isVisible: false
            },
            email: { isRequired: true, props: { required: true, type: "email" } },
            name: { isRequired: true, props: { required: true } },
            phoneNumber: { isRequired: true, props: { required: true } },
            position: {
                isRequired: true,
                reference: "Position"
            },
            currentStage: {
                isRequired: true,
                availableValues: [
                    { value: "CHECK_CV", label: "Application" },
                    { value: "CV_REJECTED", label: "CV Rejected" },
                    { value: "INTERVIEW", label: "Interview" },
                    { value: "INTERVIEW_REJECTED", label: "Interview Rejected" },
                    { value: "OFFER", label: "Offer" },
                    { value: "HIRED", label: "Hired" },
                ]
            },
            note: {
                type: 'textarea'
            },
            interview: {
                isVisible: {
                    filter: false,
                },
                components: {
                    show: AdminJS.bundle('../public/custom-components/candidate-interview'),
                }
            }
        }
    }
}

module.exports = {
    CandidateResourceOptions
}