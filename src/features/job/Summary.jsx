import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import TimeAgo from '../../components/public/Commons/TimeAgo'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROLES } from '../../helpers/Helpers';

const Summary = ({ job }) => {
    const { user } = useSelector((state) => state.auth);

  return (
    <>
    <Card.Header>
        <Card.Img src={job.LogoUrl} className='JobCardImage'/>
    </Card.Header>
    <Card.Body>
        <Card.Title>{job.Title}</Card.Title>
        <Card.Subtitle className="mb-2">{job?.Company}</Card.Subtitle>
        <Card.Subtitle>
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.City}.</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.JobType}</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">N{job.SalaryLowerRange} - N{job.SalaryUpperRange}</Badge>{' '}
        </Card.Subtitle> 
        <Card.Text className="text-muted RemoveSpace">Posted:<TimeAgo timeStamp={job.CreatedAt}/></Card.Text>
        <Card.Text className="text-muted RemoveSpace">Numbers To Be Hired: {job?.NumbersToBeHired}</Card.Text>
        {
            user && user?.UserClaims?.Roles?.includes(ROLES.Employer) ?
            <>
            <Link to={`/employer/job/${job.Id}`} style={{float: 'right', marginBottom: '1rem'}}>See Job Details</Link>
            </> :
            user && (user?.UserClaims?.Roles?.includes(ROLES.SuperAdmin) || user?.UserClaims?.Roles?.includes(ROLES.Admin)) ?
            <>
            <Link to={`/admin/job/${job.Id}`} style={{float: 'right', marginBottom: '1rem'}}>See Job Details</Link>
            </> :
            <>
            <Link to={`job/${job.Id}`} style={{float: 'right', marginBottom: '1rem'}}>See Job Details</Link>
            </>
        }
    </Card.Body>
    </>   
  )
}

export default Summary