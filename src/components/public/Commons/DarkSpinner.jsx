import { Container, Row, Spinner } from 'react-bootstrap';

const DarkSpinner = () => {
  return (
    <Container>
        <Row className="d-flex justify-content-center" style={{alignItems: 'center'}}>
            <Spinner animation="border" variant="dark" />
        </Row>
    </Container>
  )
}

export default DarkSpinner