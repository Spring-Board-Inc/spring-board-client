import { Col, Container, Row } from "react-bootstrap";
import JobDetails from "./JobDetails";

const NestedJobDetails = () => {

  return (
    <Container>
        <Row>
            <Col sm={0} md={1} lg={2}></Col>
            <Col sm={0} md={10} lg={8}>
                <JobDetails />
            </Col>
            <Col sm={0} md={1} lg={2}></Col>
        </Row>
    </Container>
  )
}

export default NestedJobDetails