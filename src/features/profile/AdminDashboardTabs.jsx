import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboardTabs = () => {
    const [key, setKey] = useState('users');
  return (
    <Nav 
        variant="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className=""
        fill
    >
      <Nav.Item>
        <Nav.Link eventKey='users' as={Link} to="/admin/user">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="employers" as={Link} to="/admin/employer">Employers</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="industries" as={Link} to="/admin/industry">Industries</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="locations/country" as={Link} to="/admin/location/country">Countries</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="jobtypes" as={Link} to="/admin/job-type">Job Types</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="skills" as={Link} to="/admin/skill">Skills</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="about" as={Link} to="/admin/about">About</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="contact" as={Link} to="/admin/contact">Contacts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="faqs" as={Link} to="/admin/faqs">FAQs</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default AdminDashboardTabs