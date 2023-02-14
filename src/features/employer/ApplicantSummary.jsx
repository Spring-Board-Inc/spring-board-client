import { Card, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { DUMMY_USER_PHOTO, totalTime} from '../../helpers/Helpers'
import { FaArrowLeft, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'

const ApplicantSummary = ({ applicant }) => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const photo = applicant?.PhotoUrl ? applicant?.PhotoUrl : DUMMY_USER_PHOTO;

  return (
    <Card className="mb-2 mt-3">
        <Card.Header className='JobCardHeader'>
            <Card.Img src={photo} className='JobCardImage'/>
            <Card.Title>{applicant?.FirstName} {applicant?.LastName}</Card.Title>
        </Card.Header>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item className='text-muted' style={{ fontSize: '0.88rem'}}><FaEnvelope/> : <a href={`mailto:${applicant?.Email}`}>{applicant?.Email}</a></ListGroup.Item>
                <ListGroup.Item className='text-muted' style={{ fontSize: '0.88rem'}}><FaPhoneAlt/> : <a href={`tel:${applicant?.PhoneNumber}`}>{applicant?.PhoneNumber}</a></ListGroup.Item>
                <ListGroup.Item className='text-muted' style={{ fontSize: '0.88rem'}}>Experience: {totalTime(applicant?.WorkExperiences)}</ListGroup.Item>
            </ListGroup>
            <ListGroup.Item className='mt-3' style={{ borderTop: '1px solid #dedede'}}>
                <Link onClick={goBack}><FaArrowLeft /></Link>
                <Link
                    style={{float: 'right'}}
                    to={applicant?.Id}
                    state={applicant}
                    >
                        View details
                </Link>
            </ListGroup.Item>
        </Card.Body>
    </Card>
  )
}

export default ApplicantSummary