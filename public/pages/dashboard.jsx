import StatsBox from "../custom-components/stats-box";
import { FunnelChart } from 'react-funnel-pipeline';
import { Box, Header } from '@adminjs/design-system';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";

const Dashboard = () => {

    const [totalPosition, setTotalPosition] = useState(0);
    const [totalCandidate, setTotalCandidate] = useState(0);
    const [totalHired, setTotalHired] = useState(0);

    const [positionsName, setPositionsName] = useState([]);
    const [nbCandidateByPosition, setNbCandidateByPosition] = useState([]);
    const [nbCandidateByStage, setNbCandidatByStage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => getStats(), []);

    function getStats() {

        fetch(`/stats`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(statsResp => statsResp.json())
            .then(statsData => {

                const { data } = statsData;
                const { candidateByPosition, candidateByStage,
                    positionCount, candidateCount, hiredCount } = data;

                setTotalPosition(positionCount);
                setTotalCandidate(candidateCount);
                setTotalHired(hiredCount);

                const positionsName = candidateByPosition.map(item => item.positionName);
                setPositionsName(positionsName);

                const nbCandidateByPosition = candidateByPosition.map(item => item.count);
                setNbCandidateByPosition(nbCandidateByPosition);


                let applications = 0, interviews = 0, offers = 0, hired = 0;
                for (let i = 0; i < candidateByStage.length; i = i + 1) {
                    applications += candidateByStage[i].count;
                    if (["INTERVIEW", "INTERVIEW_REJECTED", "OFFER", "HIRED"].includes(candidateByStage[i]._id)) {
                        interviews += candidateByStage[i].count;
                    }
                    if (["OFFER", "HIRED"].includes(candidateByStage[i]._id)) {
                        offers += candidateByStage[i].count;
                    }
                    if (["HIRED"].includes(candidateByStage[i]._id)) {
                        hired += candidateByStage[i].count;
                    }
                }
                const nbCandidateByStage = [
                    {
                        name: "Application",
                        value: applications,
                    }, {
                        name: "Interview",
                        value: interviews,
                    }, {
                        name: "Offer",
                        value: offers,
                    },
                    {
                        name: "Hired",
                        value: hired,
                    }
                ];

                setNbCandidatByStage(nbCandidateByStage);

                setLoading(false);
            })
    }

    const hiringFunnelChart = {
        data: nbCandidateByStage
    }

    const appByPositionChart = {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            barPercentage: 0.4,
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 1
                    },
                }
            },
        },
        data: {
            labels: positionsName,
            datasets: [
                {
                    label: 'Application',
                    data: nbCandidateByPosition,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },

            ],
        }
    }

    return (
        !loading ?
            (
                <div>
                    <div style={{
                        display: "flex", alignContent: "center", justifyContent: "center",
                    }}>
                        <StatsBox
                            label="Open positions" data={totalPosition}
                            link="/admin/resources/Position" icon="Archive"
                            bg="#FF4567" color="#FFFFFF"
                        ></StatsBox>

                        <StatsBox
                            label="Candidates" data={totalCandidate}
                            link="/admin/resources/Candidate" icon="ContainerSoftware"
                            bg="#F0BC13" color="#FFFFFF"
                        ></StatsBox>

                        <StatsBox
                            label="Hired" data={totalHired}
                            link="/admin/resources/Candidate?filters.currentStage=HIRED" icon="Settings"
                            bg="#70C9B0" color="#FFFFFF"
                        ></StatsBox>
                    </div >

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "50px", }}>

                        <Box width={1 / 2} variant="card" style={{ textAlign: "center", margin: "10px", padding: "18px" }}>
                            <Header.H4 style={{ fontWeight: "400", marginTop: "0px", marginBottom: "40px" }}>Application by position</Header.H4>
                            <Bar options={appByPositionChart.options} data={appByPositionChart.data} />;
                        </Box>

                        <Box width={1 / 2} variant="card" style={{ textAlign: "center", margin: "10px", padding: "18px" }}>
                            <Header.H4 style={{ fontWeight: "400", marginTop: "0px", marginBottom: "40px" }}>Recruitment Funnel</Header.H4>
                            <FunnelChart style={{ width: "70%", margin: "auto" }}
                                data={hiringFunnelChart.data}
                            />
                        </Box>
                    </div>
                </div>
            ) : ""


    );
}

export default Dashboard;
