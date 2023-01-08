import { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap"
import { FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { useDeleteExperienceMutation, useGetExperienceQuery } from "../api/experienceApi";
import { logout } from "../auth/authSlice";

const ExperienceDetails = () => {
    const { id } = useParams();
    const { data: experience, isError, error } = useGetExperienceQuery(id);
    const [deleteExperience, { isSuccess, isError: delIsError, error: delError}] = useDeleteExperienceMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goBack = () => navigate('/info/experience', { replace: true });
    
    useEffect( () => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            }
            toast.error(error?.data?.Message);
        }
    }, [isError, error, navigate, dispatch])

    useEffect(() => {
        if(delIsError){
            if(delError?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            } else if(delError?.status === 403){
                navigate('/unauthorized', { replace: true });
            } else {
                toast.error(delError?.data?.Message);
            }
        }
    }, [delIsError, delError, navigate, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success("Record deleted successfully");
            navigate('/info/experience')
        }
    }, [isSuccess, navigate])

    const onDelete = async () => {
        if(id){
            await deleteExperience(id);
        }
    }

    const minDate = new Date('0001-01-01T00:00:00').getFullYear();
    const xpDate = new Date(experience?.EndDate).getFullYear();

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className="mt-3">
                <Card.Header className='JobCardHeader'>
                { `${experience?.Designation}`.length <= 30 ?
                    <Card.Text>
                    {`${experience?.Designation}`.slice(0, 30)}
                    </Card.Text> :
                    <Card.Text>
                    {`${experience?.Designation}`.slice(0, 27)}...
                    </Card.Text>
                }
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>
                        <Card.Text>{experience?.Company}. {experience?.Location}</Card.Text>
                    </Card.Subtitle>
                    <Card.Text style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}} dangerouslySetInnerHTML={{ __html: experience?.Descriptions }}></Card.Text>
                    <Card.Text className="text-muted RemoveSpace"><strong>Start Date</strong>: {new Date(experience?.StartDate).toDateString()}.</Card.Text>
                    { minDate !== xpDate ? 
                    <Card.Text className="text-muted RemoveSpace"><strong>End Date</strong>: {new Date(experience?.EndDate).toDateString()}.</Card.Text> :
                    <Card.Text className="text-muted RemoveSpace"><strong>End Date</strong>: Current.</Card.Text>
                    }
                    <Button className="DeButton m-1" style={{float: 'right'}} onClick={onDelete}>
                        <FaTimes color="red"/>
                    </Button>
                    <Button className="DeButton m-1" style={{float: 'right'}}>
                        <Link to={`edit`}  className='EditLink'>
                            <FaEdit color="blue"/>
                        </Link>
                    </Button>
                    <Button className="DeButton m-1" style={{float: 'right'}} onClick={goBack}>
                        <FaArrowLeft color="gray"/>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={0} md={1} lg={2}></Col>
    </Row>
  )
}

export default ExperienceDetails