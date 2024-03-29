import { useEffect } from "react"
import { Row, Col, Container, Alert } from "react-bootstrap"
import { FaPlusSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useGetEducationsQuery } from "../api/educationApi"
import { logout } from "../auth/authSlice"
import EducationSummary from "./EducationSummary"
import ListSkeleton from '../../components/public/Commons/skeletons/ListSkeleton'

const Educations = () => {
  const { user } = useSelector((state) => state.auth);
  const userInfoId = user?.UserClaims?.UserInfomationId;
  const { data: educations, isLoading, isError, error } = useGetEducationsQuery(userInfoId);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
      if(error?.status === 401){
        dispatch(logout())
        toast.error('Please re-authenticate to continue');
        navigate('/login', { replace: true })
      }
    }
  }, [error, isError, navigate, dispatch])

  const content = educations?.length > 0 ? 
          educations?.map( edu => (
            <Container fluid key={edu?.Id}>
              <EducationSummary education={edu}/>
            </Container>
          )) :
          <Container>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>No Qualification Record</Alert.Heading>
                <p>Please click the "+" symbol above to add.</p>
            </Alert>
          </Container>

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-2 mx-3">
          <Link to={`/info/education/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>
        {
          isLoading ?
            <ListSkeleton height='10rem'/> :
            <Row md={1} lg={2} className="JobCard">{ content }</Row>
        }
      </Col>
    </Row>
  )
}

export default Educations