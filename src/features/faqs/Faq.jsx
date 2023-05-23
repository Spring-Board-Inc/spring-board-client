import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Faq = ({ faq }) => {
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Title>{faq?.Question}</Card.Title>
            <Link to={`${faq?.Id}`} style={{float: 'right'}}>Details</Link>
        </Card.Header>
    </Card>
  )
}

export default Faq