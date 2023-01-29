import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import { FaPlusSquare } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Alerts from '../../components/public/Commons/Alerts';
import { useGetSkillsQuery } from '../api/skillApi';
import { logout } from '../auth/authSlice';
import AdminSkill from './AdminSkill'

const SkillDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const userInfoId = user?.UserClaims?.UserInfomationId;
  const { data: skills, isError, error } = useGetSkillsQuery(userInfoId);
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
    <Col key={skill?.Id}>
      <AdminSkill skill={skill}/>
    </Col>
  )) :
  <Alerts
      heading={`No Skill Record`} 
      body={`Please refresh the page if you feel this is an error or check back later.`} 
  />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
    <Col style={{margin: '1rem 0 0 0'}}> 
      <Row className="d-flex mb-4 mx-3">
        <Link to={`/admin/skill/add`} style={{float: 'right', fontSize: '1.5rem'}}>
            <FaPlusSquare color="#212121"/>
        </Link>
      </Row>     
      <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
    </Col>
  </Row>
  )
}

export default SkillDashboard