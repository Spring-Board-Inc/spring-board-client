import React from 'react'
import { Alert, Badge, Card, Col, Row } from 'react-bootstrap'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import SingleCardSkeleton from '../../components/public/Commons/skeletons/SingleCardSkeleton'
import { toYearAndMonthOrCurrent } from '../../helpers/Helpers'

const ApplicantCV = ({ applicant, isLoading }) => {
  return (
    <>
        <Row className='CenterSearchBar mb-3' fluid>
            {
                isLoading ?
                <h1 style={{width: '50%'}}>
                    <SingleCardSkeleton height='2.5rem'/>
                </h1> :
                <h1 style={{ fontWeight: 'bold'}} className='text-center mt-3'>{applicant?.FirstName} {applicant?.LastName}</h1>
            }
            <div className='CenterSearchBar d-flex'>
                <div className="Border" style={{width: '90%'}}></div>
            </div>
            {
                isLoading ?
                    <h1 style={{width: '90%'}}>
                        <SingleCardSkeleton height='1rem'/>
                    </h1> :
                    <div className='CenterSearchBar d-flex' style={{width: '90%'}}>
                        <span className='mx-1'>{applicant?.City}, {applicant?.Country}.</span>|
                        <span className='mx-1'><a href={`tel:${applicant?.PhoneNumber}`}> {applicant?.PhoneNumber}</a></span>|
                        <span className='mx-1'><a href={`mailto:${applicant?.Email}`}> {applicant?.Email}</a></span>
                    </div>
            }
        </Row>
        { applicant?.CareerSummary ?
            <Row className='d-flex mx-5'>
                <h5 className='mb-0' style={{ fontWeight: 'bold'}}>CAREER SUMMARY</h5>
                <div className="Border mb-2 w-100"></div>
                {
                    isLoading ?
                    <SingleCardSkeleton height='5rem'/> :
                    <Row>
                        { applicant?.CareerSummary ?
                            <p style={{fontSize: '0.95rem'}}>{applicant?.CareerSummary}</p> :
                            <Alert variant='danger'>No Work Experience Information</Alert>
                        }
                    </Row>
                }
            </Row> : <></>
        }
        <Row className='d-flex mx-5'>
            <h5 className='mb-0' style={{ fontWeight: 'bold'}}>EXPERIENCES</h5>
            <div className="Border mb-2 w-100"></div>
            {
                isLoading ?
                <SingleCardSkeleton height='10rem'/> :
                <Row className=''>
                    { applicant?.WorkExperiences.length > 0 ?
                        applicant?.WorkExperiences.map(xp => (
                        <Col lg={12} key={xp?.Id} className='mb-1'>
                                <p className="text-muted mb-1">{xp?.Designation.toUpperCase()} at <strong>{xp?.Company.toUpperCase()}</strong> &mdash; <FaCalendarAlt/> {toYearAndMonthOrCurrent(xp?.StartDate)} - {toYearAndMonthOrCurrent(xp?.EndDate)}. <FaMapMarkerAlt/> {xp?.Location.split(',')[0]}</p>
                                <p className='mx-4' style={{fontSize: '0.95rem'}} dangerouslySetInnerHTML={{ __html: xp?.Descriptions}}></p>
                        </Col> 
                        )) :
                        <Alert variant='danger'>No Work Experience Information</Alert>
                    }
                </Row>
            }
        </Row>
        <Row className='d-flex mx-5'>
            <h5 className='mb-0' style={{ fontWeight: 'bold'}}>QUALIFICATIONS</h5>
            <div className="Border mb-2 w-100"></div>
            {
                isLoading ?
                <SingleCardSkeleton height='10rem'/> :
                <Row className='m-1'>
                    { applicant?.Educations.length > 0 ?
                        applicant?.Educations.map(edu => (
                            <Col lg={12} key={edu?.Id} className='mb-2'>
                                <p className='text-muted mb-1'>{edu?.LevelOfEducation} in <strong>{edu?.Major.toUpperCase()}</strong> at <strong>{edu?.School}</strong>, {edu?.City}. {edu?.Country}.</p>
                                <p className='text-muted mb-1 mx-3'><FaCalendarAlt/> {toYearAndMonthOrCurrent(edu?.StartDate)} to {toYearAndMonthOrCurrent(edu?.EndDate)}.</p>
                            </Col>
                        )) :
                        <Alert variant='danger'>No Qualification Information</Alert>
                    }
                </Row>
            }
        </Row>
        <Row className='d-flex mx-5'>
            <h5 className='mb-0' style={{ fontWeight: 'bold'}}>CERTIFICATIONS</h5>
            <div className="Border mb-2 w-100"></div>
            {
                isLoading ?
                <SingleCardSkeleton height='10rem'/> :
                <Row className='m-1'>
                    {
                        applicant?.Certifications.length > 0 ?
                            applicant?.Certifications.map( cert => (
                                <Col lg={12} key={cert?.Id} className='mb-2'>
                                    <p className='text-muted mb-1'>
                                        <strong>{cert?.Name}</strong> ({cert?.IssuingBody}) &mdash; <FaCalendarAlt/> {toYearAndMonthOrCurrent(cert?.IssuingDate)}.
                                    </p>
                                </Col> 
                            )) :
                            <Alert variant='danger'>No Certification Information</Alert>
                    }
                </Row>
            }
        </Row>
        <Card.Subtitle className='mx-5 mt-1'><h5 className='mb-0 mx-3' style={{ fontWeight: 'bold'}}>SKILLS</h5>
            <div className="Border mb-2 w-100"></div>
            {
                isLoading ?
                <SingleCardSkeleton height='3rem'/> :
                applicant?.UserSkills.length > 0 ?
                    applicant?.UserSkills && applicant?.UserSkills.map( skill => (
                            <Badge pill bg='secondary' className='mx-1 mb-1' key={skill?.SkillId}>
                                {skill?.Skill}
                            </Badge>
                        )) :
                    <Alert variant='danger'>No skill record</Alert>
            }
        </Card.Subtitle>
    </>
  )
}

export default ApplicantCV