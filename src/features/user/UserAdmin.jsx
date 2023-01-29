import { Col, Row } from 'react-bootstrap'
import Alerts from '../../components/public/Commons/Alerts';
import { useGetUsersQuery } from '../api/userApi';
import User from './User';

const UserAdmin = () => {
  const { data: users } = useGetUsersQuery('');
  const content = users?.Data?.length > 0 ? 
  users?.Data?.map( user => (
    <Col key={user?.Id}>
      <User user={user}/>
    </Col>
  )) :
  <Alerts
      heading={`No User Record`} 
      body={`Please refresh the page if you feel this is an error or check back later.`} 
  />

  return (
    <Row className="g-3 y-2 JobCard RemoveSpace">
    <Col style={{margin: '1rem 0 0 0'}} className='mt-5'> 
      <Row xs={1} sm={1} md={1} lg={2} className="g-3 JobCard">{ content }</Row>
    </Col>
  </Row>
  )
}

export default UserAdmin