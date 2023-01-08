import { useState } from "react"
import { Container, Row, Col, Form, Button } from "react-bootstrap"

const SearchBar = () => {
    const [search, setSearch] = useState('');
    
  return (
    <Container>
        <Row>
            <Col>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Row className='mt-5 CenterSearchBar'>
                        <Col xs={0} md={2}></Col>
                        <Col xs={12} md={4} className='mb-2'>
                            <Form.Control 
                                placeholder="Enter your search"
                                type='text'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                />
                        </Col>
                        <Col xs={12} md={2} className='mb-2'>
                            <Button type="submit" className='w-100 Button text-center' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Search</Button>
                        </Col>
                        <Col xs={0} md={2}></Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        <Row style={{border: '2px solid #212121', margin: '0 1px 0 1px'}}></Row>
    </Container>
  )
}

export default SearchBar