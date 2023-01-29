import { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployerDashobardTabs = () => {
  const [key, setKey] = useState('profiles');
  return (
    <Nav 
        variant="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className=""
        fill
    >
      <Nav.Item>
        <Nav.Link eventKey='profiles' as={Link} to="/employer/profile">Organizations</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="jobs" as={Link} to="/employer/job">Jobs</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default EmployerDashobardTabs