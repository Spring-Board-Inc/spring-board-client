import { Card, Badge } from "react-bootstrap";
import TimeAgo from '../../components/public/Commons/TimeAgo';
import { Link } from "react-router-dom";
import { ROLES } from "../../helpers/Helpers";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";
import Eta from "../../components/public/Commons/Eta";

const JobSummary = ({ job }) => {
  const { user } = useSelector((state) => state.auth);
  const [days, setDays] = useState(0);

    useEffect(() => {
        if(job){
            const timeStamp = new Date(job?.ClosingDate)?.toISOString()
            const date = parseISO(timeStamp);
            const days = differenceInDays(date, new Date());
            setDays(days);
        }
    }, [job])
  
  return (
    <Card className="mb-2">
        <Card.Header className='JobCardHeader'>
            <Card.Img src={job.LogoUrl} className='JobCardImage'/>
            <Card.Text>{job.Company}</Card.Text>
        </Card.Header>
        <Card.Body>
            <Card.Title>{job.Title}</Card.Title>
            <Card.Subtitle>
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.City}.</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">{job.JobType}</Badge>{' '}
            <Badge className='JobCardBadge mb-1' pill bg="secondary">N{job.SalaryLowerRange} - N{job.SalaryUpperRange}</Badge>{' '}
            </Card.Subtitle>
            <Card.Text className="RemoveSpace" dangerouslySetInnerHTML={{ __html: `${job?.Descriptions}`.slice(0, 100) }}></Card.Text> 
            <Card.Text className="text-muted RemoveSpace">Posted:<TimeAgo timeStamp={job.CreatedAt}/></Card.Text>
            <Card.Text className="text-muted RemoveSpace">
              { days === 0 ?
                  <>
                      Closing: Today
                  </> : days < 0 ?
                  <>
                      Closed: <Eta timeStamp={job?.ClosingDate}/>
                  </> :
                  <>
                      Closing Date: {new Date(job?.ClosingDate).toDateString()}
                  </>
              }
            </Card.Text>
            {
              user && user?.UserClaims?.Roles?.includes(ROLES.Employer) ?
              <>
                <Link 
                  to={`/employer/job/${job.Id}`} 
                  style={{float: 'right'}}
                >See Job Details</Link>
              </> :
              user && (user?.UserClaims?.Roles?.includes(ROLES.SuperAdmin) || user?.UserClaims?.Roles?.includes(ROLES.Admin)) ?
              <>
                <Link to={`/admin/job/${job.Id}`} style={{float: 'right'}}>See Job Details</Link>
              </> :
              <>
                <Link to={`job/${job.Id}`} style={{float: 'right'}}>See Job Details</Link>
              </>
            }
        </Card.Body>
    </Card>
  )
}

export default JobSummary