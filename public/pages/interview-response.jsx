import { Button, ValueGroup, DatePicker, MessageBox, RichText, Label, Input } from "@adminjs/design-system";
import { useState, useEffect } from "react";

const InterviewResponse = (props) => {

    const isInterviewAccepted = props.action.name === "AcceptAfterInterview";
    const candidate = props.record.params;
    const position = props.record.populated.position.title;
    const { _id, name } = candidate;

    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    function getEmailContent() {
        const emailName = isInterviewAccepted ? "INTERVIEW_SUCCESS" : "INTERVIEW_REJECT";
        fetch(`/admin/api/resources/Email/actions/list?filters.name=${emailName}&page=1`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(emailResp => emailResp.json())
            .then(emailList => {
                const email = emailList.records[0].params;
                let emailSubject = email.subject;
                let emailBody = email.body;

                emailSubject = emailSubject.replace("[JOB_TITLE]", position);
                emailBody = emailBody.replace("[APPLICANT_NAME]", candidate.name);
                emailBody = emailBody.replace("[JOB_TITLE]", position);

                setSubject(emailSubject);
                setBody(emailBody);
            });
    }

    async function sendRequestUpdateCandidate({ stage }) {

        const updateCandidateRequest = {
            ...candidate,
            currentStage: stage
        }

        const updateCandidateResponse = await fetch(`/admin/api/resources/Candidate/records/${_id}/edit`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateCandidateRequest)
        });
        const data = await updateCandidateResponse.json();
        return data;
    }

    async function sendRequestSendEmail() {
        const sendEmailRequest = {
            subject: subject,
            body: body,
            receivers: candidate.email
        }

        const sendEmailResponse = await fetch(`/emails/sendEmail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendEmailRequest)
        });

        const data = await sendEmailResponse.json();
        return data;
    }

    function displayMessage(messageId) {
        document.getElementById(messageId).style.display = "block";
        setTimeout(() => {
            document.getElementById(messageId).style.display = "none";
        }, 2000);
    }

    async function acceptInterview() {

        try {
            const { record } = await sendRequestUpdateCandidate({ stage: "OFFER" });
            await sendRequestSendEmail();

            displayMessage("success");
            window.location.pathname = `/admin/resources/Candidate/records/${record.id}/show`;

        } catch (error) {
            displayMessage("error");
        }
    }

    async function rejectCandidate() {

        try {
            const { record } = await sendRequestUpdateCandidate({ stage: "INTERVIEW_REJECTED" });
            await sendRequestSendEmail();

            displayMessage("success");
            window.location.pathname = `/admin/resources/Candidate/records/${record.id}/show`;

        } catch (error) {
            displayMessage("error");
        }
    }

    useEffect(() => getEmailContent(), []);

    return (
        <div >
            <ValueGroup
                label="Candidate"
                value={name}
            />

            {isInterviewAccepted ? (
                <ValueGroup
                    label="Decision"
                    value="Select"
                />
            ) : (
                <ValueGroup
                    label="Decision"
                    value="Reject"
                />
            )}

            {subject && body ? (
                <div>
                    <Label>Email to candidate</Label>
                    <ValueGroup label="Subject">
                        <Input width="25%" value={subject} />
                    </ValueGroup>
                    <ValueGroup label="Body">
                        <RichText
                            quill={{
                                theme: 'snow',
                            }}
                            value={body}
                            onChange={setBody}
                        />
                    </ValueGroup>
                </div>
            ) : ""}

            {isInterviewAccepted ? (

                <ValueGroup>
                    <Button onClick={acceptInterview}>Accept</Button>
                </ValueGroup>
            ) : (
                <ValueGroup>
                    <Button onClick={rejectCandidate}>Reject</Button>
                </ValueGroup>
            )}

            <MessageBox id="success" style={{ display: "none", position: "fixed", top: 0, right: 0 }}
                size="lg"
                mt="default"
                variant="success"
            >
                Success!
            </MessageBox>

            <MessageBox id="error" style={{ display: "none", position: "fixed", top: 0, right: 0 }}
                size="lg"
                mt="default"
                variant="error"
            >
                Problem! Please check the error!
            </MessageBox>
        </div>
    );
}

export default InterviewResponse;
