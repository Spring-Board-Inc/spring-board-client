import { useEffect } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListSkeleton from "../../components/public/Commons/skeletons/ListSkeleton";
import { useGetCertificationsQuery } from "../api/certificationApi";
import { logout } from "../auth/authSlice";
import CertificationSummary from "./CertificationSummary";

const Certifications = () => {
    const { user } = useSelector((state) => state.auth);
    const userInfoId = user?.UserClaims?.UserInfomationId;
    const { data: certifications, isLoading, isError, error } = useGetCertificationsQuery(userInfoId);
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


      const content = certifications?.length > 0 ? 
          certifications?.map( cert => (
            <Container fluid key={cert?.Id}>
              <CertificationSummary certification={cert}/>
            </Container>
          )) :
          <Container>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>No Certification Record</Alert.Heading>
                <p>Please click the "+" symbol above to add.</p>
            </Alert>
          </Container>

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
      <Col style={{margin: '1rem 0 0 0'}}> 
        <Row className="d-flex mb-4 mx-3">
          <Link to={`/info/certification/add`} style={{float: 'right', fontSize: '1.5rem'}}>
              <FaPlusSquare color="#212121"/>
          </Link>
        </Row>
        {
          isLoading ?
            <ListSkeleton height='8rem'/> :
            <Row md={1} lg={2} className="g-3 JobCard">{ content }</Row>
        }
      </Col>
    </Row>
  )
}

export default Certifications