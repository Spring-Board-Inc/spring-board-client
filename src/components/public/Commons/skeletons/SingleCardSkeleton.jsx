import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const SingleCardSkeleton = ({ height }) => {
  return (
    <Container className='mt-3'>
        <Row>
            <Col className='mb-2'>
                <Card>
                    <div className="skeleton skeleton-big-text" style={{height: height}}></div>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default SingleCardSkeleton