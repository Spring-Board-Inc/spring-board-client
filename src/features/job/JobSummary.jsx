import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROLES } from "../../helpers/Helpers";
import { useSelector } from "react-redux";
import Summary from "./Summary";

const JobSummary = ({ job }) => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <Card className="mb-2">
    {
            user && user?.UserClaims?.Roles?.includes(ROLES.Employer) ?
            <>
            <Link to={`/employer/job/${job.Id}`} style={{float: 'right'}} className="DeLink">
              <Summary job={job}/>
            </Link>
            </> :
            user && (user?.UserClaims?.Roles?.includes(ROLES.SuperAdmin) || user?.UserClaims?.Roles?.includes(ROLES.Admin)) ?
            <>
            <Link to={`/admin/job/${job.Id}`} style={{float: 'right'}} className="DeLink">
              <Summary job={job}/>
            </Link>
            </> :
            <>
            <Link to={`job/${job.Id}`} style={{float: 'right'}} className="DeLink">
              <Summary job={job}/>
            </Link>
            </>
      }
    </Card>
  )
}

export default JobSummary