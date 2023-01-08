import { Row, Card, Col, Button } from "react-bootstrap"
import { FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteEducationMutation, useGetEducationQuery } from "../api/educationApi";
import { logout } from "../auth/authSlice";
import { useDispatch } from "react-redux";

const EducationDetails = () => {
    const { id } = useParams();
    const { data: education, isError, error } = useGetEducationQuery(id);
    const [deleteEducation, { isSuccess, isError: delIsError, error: delError}] = useDeleteEducationMutation();

    const minDate = new Date('0001-01-01T00:00:00').getFullYear();
    const xpDate = new Date(education?.EndDate).getFullYear();

    const navigate = useNavigate();
    const goBack = () => navigate('/info/education', { replace: true });
    const dispatch = useDispatch();
    
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
            } else {
                toast.error(delError?.data?.Message);
            }
        }
    }, [delIsError, delError, navigate, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success("Record deleted successfully");
            navigate('/info/education')
        }
    }, [isSuccess, navigate])

    const onDelete = async () => {
        if(id){
            await deleteEducation(id);
        }
    }

  return (
    <Row>
        <Col sm={0} md={1} lg={2}></Col>
        <Col sm={12} md={10} lg={8}>
            <Card className='mt-3'>
                <Card.Header className='JobCardHeader'>
                    <Card.Text>{education?.School}, {education?.City}. {education?.Country}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>{education?.LevelOfEducation}: {education?.Course}</Card.Subtitle>
                    <Card.Text className="text-muted RemoveSpace">Start Date: {new Date(education?.StartDate).toDateString()}.</Card.Text>
                    { minDate !== xpDate ?
                    <Card.Text className="text-muted RemoveSpace">End Date: {new Date(education?.EndDate).toDateString()}.</Card.Text> :
                    <Card.Text className="text-muted RemoveSpace">End Date: Running.</Card.Text>
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

export default EducationDetails