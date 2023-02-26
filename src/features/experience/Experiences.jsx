import { useEffect } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { FaPlusSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Alerts from "../../components/public/Commons/Alerts"
import ListSkeleton from "../../components/public/Commons/skeletons/ListSkeleton"
import { useGetExperiencesQuery } from "../api/experienceApi"
import { logout } from "../auth/authSlice"
import ExperienceSummary from "./ExperienceSummary"

const Experiences = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const { data: experiences, isLoading, isError, error } = useGetExperiencesQuery(userInfoId);
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
          <Alerts heading={`No Work Experience Record`} body={`Please click the "+" symbol above to add.`} />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/info/experience/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>
        {
          isLoading ?
            <ListSkeleton height='18rem'/> :
            <Row md={1} lg={2} className="g-3 JobCard">{ content }</Row>
        }
      </Col>
    </Row>
  )
}

export default Experiences