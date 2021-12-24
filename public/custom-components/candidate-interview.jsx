import { useState } from "react";
import { Box, ValueGroup } from '@adminjs/design-system';
import {formatDateTime} from '@adminjs/design-system';

const CandidateInterview = (props) => {

    const [interviewDate, setInterviewDate] = useState(null);
    const candidateId = props.record.id;
    fetch(`/admin/api/resources/Interview/actions/list?filters.candidateId=${candidateId}&page=1`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(data => {
            if (!data.records.length) {
                return;
            }
            const inteview = data.records[0].params;
            const date = new Date(inteview.date);
            
            setInterviewDate(formatDateTime(date));
        })

    return (
        <Box>
            <ValueGroup
                label="Interview"
                value={interviewDate}
            />
        </Box>
    );
}

export default CandidateInterview;
