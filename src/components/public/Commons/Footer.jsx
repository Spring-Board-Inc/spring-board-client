import '../../../App.css';
import { Container, Row, Col } from 'react-bootstrap';
import SocialMedia from './SocialMedia';

const Footer = () => {
    let year = new Date().getFullYear();
    let company = 'Spring Board';

  return (
    <Container fluid style={{ backgroundColor: '#212121'}}>
        <Row className='Footer'>
            <Col sm={0} md={2} lg={3}></Col>
            <Col sm={12} md={4} lg={3}>
                <footer style={{fontSize: '0.9rem'}} className='text-center'>{company}&#174;&#8482; Inc. &#169;{year}</footer>
            </Col>
            <Col sm={12} md={4} lg={3}>
                <SocialMedia />
            </Col>
            <Col sm={0} md={2} lg={3}></Col>
        </Row>
    </Container>
  )
}

export default Footer