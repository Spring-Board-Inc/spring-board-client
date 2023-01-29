import { Alert, Badge, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { differenceInTime, DUMMY_USER_PHOTO, ratingColor, toYearAndMonth } from '../../helpers/Helpers'
import { FaArrowRight, FaEnvelope, FaPhoneAlt, FaStar } from 'react-icons/fa'
import SkillRatingsTooltip from '../../components/public/Commons/SkillRatingsTooltip'

const ApplicantSummary = ({ applicant }) => {
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
            </ListGroup>
            <ListGroup variant='flush' className='text-muted mb-2'><span style={{ fontWeight: 'bold'}}>EXPERIENCES</span>
                {
                    applicant?.WorkExperiences.length > 0 ?
                    applicant?.WorkExperiences && applicant?.WorkExperiences.map( xp => (
                        <ListGroup key={xp?.Id} style={{ fontSize: '0.88rem', borderTop: '1px solid #dedede'}}>
                            <span className='mx-2'><FaArrowRight /> { xp?.Company}: {xp?.Designation} - ({ differenceInTime(xp?.StartDate, xp?.EndDate)})</span>
                        </ListGroup>
                    )) :
                    <Alert variant='danger'>No experience record</Alert>
                }
            </ListGroup>
            <ListGroup variant='flush' className='text-muted mb-2'><span style={{ fontWeight: 'bold'}}>QUALIFICATIONS</span>
                {
                    applicant?.Educations.length > 0 ?
                    applicant?.Educations && applicant?.Educations.map( edu => (
                        <ListGroup key={edu?.Id} style={{ fontSize: '0.88rem', borderTop: '1px solid #dedede'}}>
                            <span className='mx-2'><FaArrowRight /> {edu?.Major} ({edu?.LevelOfEducation}): { edu?.School }, {edu?.City}, {edu?.Country}. ({toYearAndMonth(edu?.EndDate)})</span>
                        </ListGroup>
                    )) :
                    <Alert variant='danger'>No education record</Alert>
                }
            </ListGroup>
            <ListGroup variant='flush' className='text-muted mb-2'><span style={{ fontWeight: 'bold'}}>CERTIFICATIONS</span>
                {
                    applicant?.Certifications.length > 0 ?
                    applicant?.Certifications && applicant?.Certifications.map( cert => (
                        <ListGroup key={cert?.Id} style={{ fontSize: '0.88rem', borderTop: '1px solid #dedede'}}>
                            <span className='mx-2'><FaArrowRight /> { cert?.Name}: ({toYearAndMonth(cert?.IssuingDate)})</span>
                        </ListGroup>
                    )) :
                    <Alert variant='danger'>No certification record</Alert>
                }
            </ListGroup>
            <Card.Subtitle className='text-muted mb-2 mt-2'><span style={{ fontWeight: 'bold'}}>SKILLS <SkillRatingsTooltip /></span>
            <hr className='m-1'/>
                { 
                    applicant?.UserSkills.length > 0 ?
                        applicant?.UserSkills && applicant?.UserSkills.map( skill => (
                            <Badge pill bg='secondary' className='mx-1 mb-1' key={skill?.SkillId}>
                                {skill?.Skill} <FaStar color={ratingColor(skill?.Level)}/>
                            </Badge>
                        )) :
                    <Alert variant='danger'>No skill record</Alert>
                }  
            </Card.Subtitle>
            <ListGroup.Item className='mt-3' style={{ borderTop: '1px solid #dedede'}}>
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