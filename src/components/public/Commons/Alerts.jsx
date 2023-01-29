import { Alert, Container } from 'react-bootstrap'

const Alerts = ({ heading, body }) => {
  return (
    <Container>
        <Alert variant="danger" className="text-center">
            <Alert.Heading>{ heading }</Alert.Heading>
            <p>{ body }</p>
        </Alert>
    </Container>
  )
}

export default Alerts