import { useEffect } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserSkillsQuery } from "../api/userSkillApi";
import { logout } from "../auth/authSlice";
import SkillSummary from "./SkillSummary";

const Skills = () => {
  const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const { data: skills, isError, error } = useGetUserSkillsQuery(userInfoId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if(isError){
        if(error?.status === 401){
          dispatch(logout())
          toast.error('Please re-authenticate to continue');
          navigate('/login', { replace: true })
        }
      }
    }, [error, isError, navigate, dispatch])

  const content = skills?.length > 0 ? 
          skills?.map( skill => (
            <Container fluid key={skill?.SkillId}>
              <SkillSummary skill={skill}/>
            </Container>
          )) :
          <Container>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>No Skill Record</Alert.Heading>
                <p>Please click the "+" symbol above to add.</p>
            </Alert>
          </Container>

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}>
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/info/user-skill/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>
        <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      </Col>
    </Row>
  )
}

export default Skills