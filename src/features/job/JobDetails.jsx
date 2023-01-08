import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import DarkSpinner from '../../components/public/Commons/DarkSpinner';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLES } from "../../helpers/Helpers";
import TimeAgo from "../../components/public/Commons/TimeAgo";
import Eta from "../../components/public/Commons/Eta";
import ApplicationModal from "./ApplicationModal";
import { useEffect } from "react";
import { toast } from "react-toastify";
import '../../App.css'
import { useGetJobQuery } from "../api/jobApi";

const JobDetails = () => {
    const { jobId } = useParams();
    const { data: job, isLoading, isError, error } = useGetJobQuery(jobId);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const isApplicant = user?.UserClaims?.Roles?.includes(ROLES.Applicant) ? true : false;
    
    useEffect( () => {
        if(isError){
            toast.error(error?.data?.Message);
        }
    }, [jobId, isError, error])

  return (
    <Container>
        <Row className="g-3 y-5 JobCard RemoveSpace">
            <Col sm={0} md={2} lg={4} className='py-1'></Col>
            <Col sm={12} md={8} lg={4}  style={{margin: '5rem 0 0 0'}}>
                { isLoading ? 
                    <DarkSpinner /> :
                    <>
                        {job && (
                        <>
                        <Card>
                            <Card.Header className='JobCardHeader'>
                                <Card.Img src={job.LogoUrl} className='JobCardImage'/>
                                <Card.Text>{job.Company}</Card.Text>
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{job.Title}</Card.Title>
                                <Card.Subtitle>
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.Town}, {job.State}.</Badge>{' '}
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.JobType}</Badge>{' '}
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">N{job.SalaryLowerRange} - N{job.SalaryUpperRange}</Badge>{' '}
                                </Card.Subtitle>
                                <Card.Text className="RemoveSpace">{job.Descriptions}</Card.Text>
                                <Card.Text className="text-muted RemoveSpace">Posted:<TimeAgo timeStamp={job.CreatedAt}/></Card.Text>
                                <Card.Text className="text-muted RemoveSpace">Closing Date: <Eta timeStamp={job.ClosingDate} /></Card.Text>
                                { (job.NumberOfApplicants === 0) ?
                                    <Card.Text className="text-muted RemoveSpace py-1">
                                        No one has applied
                                    </Card.Text> :
                                    (job.NumberOfApplicants === 1) ? 
                                        <Card.Text className="text-muted RemoveSpace py-1">
                                            {job?.NumberOfApplicants} person has applied
                                        </Card.Text> :
                                        <Card.Text className="text-muted RemoveSpace py-1">
                                            {job?.NumberOfApplicants?.toLocaleString('en-US')} persons have applied
                                        </Card.Text>   
                                }

                                {(user && !isApplicant) ?
                                    <>
                                        <Button className="ModalButton m-1">Edit</Button>
                                        <Button className="DeleteButton m-1" style={{float: 'right'}}>Delete</Button>
                                    </>
                                     :
                                     <>
                                        <Button className="btn-secondary w-50 m-1" onClick={goBack}>Back</Button>
                                        <ApplicationModal
                                            user={user}
                                            job={job}
                                        />
                                     </>
                                }
                            </Card.Body>
                        </Card>
                        </>
                        )}
                    </>
                }
            </Col>
            <Col sm={0} md={2} lg={4} className='mt-5'></Col>
        </Row>
    </Container>
  )
}

export default JobDetails