import { Row, Col, Card } from "react-bootstrap";
import Spinners from '../../components/public/Commons/Spinner';
import '../../App.css';
import { useGetJobStatsQuery } from "../api/jobApi";

const JobStats = () => {
    const { data: jobStat, isLoading } = useGetJobStatsQuery(); 
    
  return (
    <Row className='JobStatsRow'>
        <Col xs={12} sm={6} md={3} className='JobStatsColumns'>
            <Card className='Card'>
                { isLoading ? 
                    <Spinners /> : 
                    <>
                        <Card.Body className='JobStatsCard'>
                            <Card.Text className='JobStatsText'>{jobStat?.JobSeekers}</Card.Text>
                            <Card.Text className='JobStatsText'>Candidates</Card.Text>
                        </Card.Body>
                    </>
                }
            </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className='JobStatsColumns'>
            <Card className='Card'>
                { isLoading ? 
                    <Spinners /> : 
                    <>
                        <Card.Body className='JobStatsCard'>
                            <Card.Text className='JobStatsText'>{jobStat?.ActiveJobs}</Card.Text>
                            <Card.Text className='JobStatsText'>Active Jobs</Card.Text>
                        </Card.Body>
                    </>
                }
            </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className='JobStatsColumns'>
            <Card className='Card'>
                { isLoading ? 
                    <Spinners /> : 
                    <>
                        <Card.Body className='JobStatsCard'>
                            <Card.Text className='JobStatsText'>{jobStat?.JobsFilled}</Card.Text>
                            <Card.Text className='JobStatsText'>Jobs Filled</Card.Text>
                        </Card.Body>
                    </>
                }
            </Card>
        </Col>
        <Col xs={12} sm={6} md={3} className='JobStatsColumns'>
            <Card className='Card'>
                { isLoading ? 
                    <Spinners /> : 
                    <>
                        <Card.Body className='JobStatsCard'>
                            <Card.Text className='JobStatsText'>{jobStat?.Companies}</Card.Text>
                            <Card.Text className='JobStatsText'>Companies</Card.Text>
                        </Card.Body>
                    </>
                }
            </Card>
        </Col>
    </Row>
  )
}

export default JobStats