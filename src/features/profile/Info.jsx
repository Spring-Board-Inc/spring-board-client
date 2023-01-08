import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function TabsExample() {
    const [key, setKey] = useState('education');
  return (
    <Nav 
        variant="tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className=""
        fill
    >
      <Nav.Item>
        <Nav.Link eventKey='education' as={Link} to="/info/education">Qualifications</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="experience" as={Link} to="/info/experience">Experiences</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="skill" as={Link} to="/info/user-skill">Skills</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="certification" as={Link} to="/info/certification">Certifications</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default TabsExample;