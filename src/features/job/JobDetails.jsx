import { Row, Col, Card, Badge, Button } from "react-bootstrap";
import DarkSpinner from '../../components/public/Commons/DarkSpinner';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../helpers/Helpers";
import TimeAgo from "../../components/public/Commons/TimeAgo";
import Eta from '../../components/public/Commons/Eta'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import '../../App.css'
import { useDeleteJobMutation, useGetJobQuery } from "../api/jobApi";
import { logout } from "../auth/authSlice";
import { differenceInDays, parseISO } from "date-fns";

const JobDetails = () => {
    const { jobId } = useParams();
    const { data: job, isLoading, isError, error } = useGetJobQuery(jobId);
    const [deleteJob, { isLoading: isDelLoading, isError: isDelError, error: delError, isSuccess}] = useDeleteJobMutation()
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dispatch = useDispatch();
    const [days, setDays] = useState(0);

    useEffect(() => {
        if(job){
            const timeStamp = new Date(job?.ClosingDate)?.toISOString()
            const date = parseISO(timeStamp);
            const days = differenceInDays(date, new Date());
            setDays(days);
        }
    }, [job])

    useEffect( () => {
        if(isError){
            if(error?.status === 401){
                toast.error("Please re-authenticate to continue");
                dispatch(logout())
                navigate('/login', { replace: true })
            } else {
                toast.error(error?.data?.Message);
            }
        }
    }, [isError, error, dispatch, navigate])

    useEffect( () => {
        if(isDelError){
            if(delError?.status === 401){
                toast.error("Please re-authenticate to continue");
                dispatch(logout())
                navigate('/login', { replace: true })
            } else {
                toast.error(delError?.data?.Message);
            }
        }
    }, [isDelError, delError, dispatch, navigate])

    useEffect( () => {
        if(isSuccess){
            toast.success("job record successfully deleted");
            navigate('/employer/job', { replace: true })
        }
    }, [isSuccess, navigate])

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const onDelete = async() => {
        await deleteJob(job?.Id)
    }

  return (
        <Row>
            <Col sm={0} md={1} lg={2} className='py-1'></Col>
            <Col sm={12} md={10} lg={8}  style={{margin: '4rem 0 0 0'}}>
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
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">{job?.City}, {job?.State}.</Badge>{' '}
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">{job?.Country}</Badge>{' '}
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">{job?.JobType}</Badge>{' '}
                                    <Badge className='JobCardBadge mb-1' pill bg="secondary">N{job?.SalaryLowerRange} - N{job?.SalaryUpperRange}</Badge>{' '}
                                </Card.Subtitle>
                                <Card.Text className="RemoveSpace" dangerouslySetInnerHTML={{ __html: `${job?.Descriptions}` }}></Card.Text>
                                <Card.Text className="text-muted RemoveSpace">Numbers To Be Hired: {job?.NumbersToBeHired}</Card.Text>
                                <Card.Text className="text-muted RemoveSpace">Posted:<TimeAgo timeStamp={job?.CreatedAt}/></Card.Text>
                                <Card.Text className="text-muted RemoveSpace">
                                    { days === 0 ?
                                        <>
                                            Closing: Today
                                        </> : days < 0 ?
                                        <>
                                            Closed: <Eta timeStamp={job?.ClosingDate}/>
                                        </> :
                                        <>
                                            Closing Date: {new Date(job?.ClosingDate).toDateString()}
                                        </>
                                    }
                                </Card.Text>
                                { (job.NumberOfApplicants === 0) ?
                                    <Card.Text className="text-muted RemoveSpace py-1">
                                        No one has applied
                                    </Card.Text> :
                                    (job?.NumberOfApplicants === 1 && user?.UserClaims?.Roles.includes(ROLES.Employer)) ?
                                        <Card.Text className="text-muted RemoveSpace py-1">
                                            <Link to={`applicants`}>
                                                {job?.NumberOfApplicants} person has applied
                                            </Link>
                                        </Card.Text> : (job?.NumberOfApplicants > 1 && user?.UserClaims?.Roles.includes(ROLES.Employer)) ?
                                        <Card.Text className="text-muted RemoveSpace py-1">
                                            <Link to={`applicants`}>
                                                {job?.NumberOfApplicants?.toLocaleString('en-US')} persons have applied
                                            </Link>
                                        </Card.Text> : (job?.NumberOfApplicants === 1 && !user?.UserClaims?.Roles.includes(ROLES.Employer)) ?
                                        <Card.Text className="text-muted RemovedSpace px-1">{job?.NumberOfApplicants} person has applied</Card.Text> :
                                        <Card.Text className="text-muted RemovedSpace px-1">{job?.NumberOfApplicants} persons have applied</Card.Text>
                                }
                                <Row className="centered">
                                {(user && user?.UserClaims?.Roles?.includes(ROLES.Employer)) ?
                                    <>
                                        <Col sm={12} md={4} className='centered'>
                                            <Button className="btn-secondary w-100 m-1" onClick={goBack}>Back</Button>
                                        </Col>
                                        <Col sm={12} md={4} className='centered'>
                                            <Button className="w-100 m-1" style={{ backgroundColor: '#212121', border: 'none'}}>
                                                <Link 
                                                    to={`/employer/job/${job?.Id}/edit`} 
                                                    style={{ textDecoration: 'none', color: '#ededed'}}
                                                    state={job}
                                                >Edit</Link>
                                            </Button>
                                        </Col>
                                        <Col sm={12} md={4} className='centered'>
                                            { !show ?
                                                <Button className="btn-danger w-100 m-1" onClick={handleShow}>Delete</Button> :
                                                <Button className="btn-danger w-100 m-1" onClick={onDelete} disabled={isDelLoading}>Confirm!</Button>
                                            }
                                        </Col>
                                    </>
                                    : (user && (user?.UserClaims?.Roles?.includes(ROLES.SuperAdmin) || user?.UserClaims?.Roles?.includes(ROLES.Admin))) ?
                                     <>
                                        <Col sm={12} md={6} className='centered'>
                                            <Button className="btn-secondary w-100 m-1" style={{ border: 'none'}} onClick={goBack}>Back</Button>
                                        </Col>
                                        <Col sm={12} md={6} className='centered'>
                                            { !show ?
                                                <Button className="btn-danger w-100 m-1" onClick={handleShow}>Delete</Button> :
                                                <Button className="btn-danger w-100 m-1" onClick={onDelete} disabled={isDelLoading}>Confirm!</Button>
                                            }
                                        </Col>
                                     </> :
                                     <>
                                        <Col sm={12} md={6} className='centered'>
                                            <Button className="btn-secondary w-100 m-1" style={{ border: 'none'}} onClick={goBack}>Back</Button>
                                        </Col>
                                        <Col sm={12} md={6} className='centered'>
                                            <Button className='w-100 m-1' style={{ backgroundColor: '#212121', border: 'none' }}>
                                                <Link to={`apply`} style={{ textDecoration: 'none', color: '#ededed'}}>Apply</Link>
                                            </Button>
                                        </Col>
                                     </>
                                }
                                </Row>
                            </Card.Body>
                        </Card>
                        </>
                        )}
                    </>
                }
            </Col>
            <Col sm={0} md={1} lg={2} className='mt-5'></Col>
        </Row>
  )
}

export default JobDetails