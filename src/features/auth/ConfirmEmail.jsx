import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DarkSpinner from "../../components/public/Commons/DarkSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useConfirmEmailMutation } from "../api/authApi";
import { toast } from "react-toastify";

const ConfirmEmail = () => {
    const [confirmEmail, { data: res, isLoading, isSuccess, isError, error } ] = useConfirmEmailMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const token = location?.state?.Token;
    const userId = location?.state?.UserId;

    useEffect(() => {
        const confirmUserEmail = async () => {
            if(token && userId){
                const data = { token, userId }
                await confirmEmail(data);
            } else {
                navigate('/', { replace: true })
            }
        }
        confirmUserEmail();
        
        if(isError){
            toast.error(error?.data?.Message)
        }

        if(isSuccess || res){
            toast.success("Email confirmation successful. Please log in.");
            navigate('/login', { replace: true });
        }

    }, [token, userId, navigate, res, isError, isSuccess, error, confirmEmail]);

  return (
    <Container>
        <Row className='py-5 Main'>
            <Col sm={0} md={2} lg={4}></Col>
            <Col sm={12} md={8} lg={4}>
                <Card className="ConfirmEmail">
                    <Card.Body>
                        { isLoading ? 
                            <DarkSpinner /> :
                            <>
                                <Card.Text>{error?.data?.Message}</Card.Text>
                                <Card.Text><Link to='/register'>Register</Link> or go <Link to='/'>Home</Link></Card.Text>
                            </>
                        }
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={0} md={2} lg={4}></Col>
        </Row>
    </Container>
  )
}

export default ConfirmEmail