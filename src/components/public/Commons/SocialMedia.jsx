import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedinIn, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import '../../../App.css';

const SocialMedia = () => {
  return (
    <Container>
        <Row className='text-muted d-flex IconFontSize'>
            <Col>
                <a href='/www.facebook.com/toba.ojo1' className='ContactLinks text-muted Centered'>
                    <FaFacebook />
                </a>
            </Col>
            <Col>
                <a href='/www.facebook.com/toba.ojo1' className='ContactLinks text-muted Centered'>
                    <FaLinkedinIn />
                </a>
            </Col>
            <Col>
                <a href='www.facebook.com/toba.ojo1' className='ContactLinks text-muted Centered'>
                    <FaTwitter />
                </a>
            </Col>
            <Col>
                <a href='/www.facebook.com/toba.ojo1' className='ContactLinks text-muted Centered'>
                    <FaWhatsapp />
                </a>
            </Col>   
        </Row>
    </Container>
  )
}

export default SocialMedia