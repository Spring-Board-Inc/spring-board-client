import { Card, Badge } from "react-bootstrap";
import TimeAgo from '../../components/public/Commons/TimeAgo';
import Eta from '../../components/public/Commons/Eta';
import { Link } from "react-router-dom";

const JobSummary = ({ job }) => {
  return (
    <Card>
        <Card.Header className='JobCardHeader'>
            <Card.Img src={job.LogoUrl} className='JobCardImage'/>
            <Card.Text>{job.Company}</Card.Text>
        </Card.Header>
        <Card.Body>
            <Card.Title>{job.Title}</Card.Title>
            <Card.Subtitle>
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.Town}, {job.State}.</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.JobType}</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">N{job.SalaryLowerRange} - N{job.SalaryUpperRange}</Badge>{' '}
            </Card.Subtitle>
            <Card.Text className="RemoveSpace">{job.Descriptions.slice(0, 70)}...</Card.Text>
            <Card.Text className="text-muted RemoveSpace">Posted:<TimeAgo timeStamp={job.CreatedAt}/></Card.Text>
            <Card.Text className="text-muted RemoveSpace">Closing Date: <Eta timeStamp={job.ClosingDate} /></Card.Text>
            <Link to={`jobs/${job.Id}`} style={{float: 'right'}}>See Job Details</Link>
        </Card.Body>
    </Card>
  )
}

export default JobSummary