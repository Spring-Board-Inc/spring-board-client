import { useEffect } from "react"
import { Row, Col, Container, Alert } from "react-bootstrap"
import { FaPlusSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useGetExperiencesQuery } from "../api/experienceApi"
import { logout } from "../auth/authSlice"
import ExperienceSummary from "./ExperienceSummary"

const Experiences = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const { data: experiences, isError, error } = useGetExperiencesQuery(userInfoId);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
      if(isError){
        if(error?.status === 401){
          dispatch(logout())
          toast.error('Please re-authenticate to continue');
          navigate('/login', { replace: true })
        } else if(error?.status === 403){
          navigate('/unauthorized', { replace: true })
        }
      }
    }, [error, isError, navigate, dispatch])

    const content = experiences?.length > 0 ? 
          experiences?.map( xp => (
            <Container fluid key={xp?.Id}>
              <ExperienceSummary experience={xp}/>
            </Container>
          )) :
          <Container>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>No Work Experience Record</Alert.Heading>
                <p>Please click the "+" symbol above to add.</p>
            </Alert>
          </Container>

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/info/experience/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>     
        <Row md={1} lg={2} className="g-3 JobCard">{ content }</Row>
      </Col>
    </Row>
  )
}

export default Experiences