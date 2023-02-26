import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { shortDateTime } from "../../helpers/Helpers"

const EducationSummary = ( { education }) => {
  const minDate = new Date('0001-01-01T00:00:00').getFullYear();
  const xpDate = new Date(education?.EndDate).getFullYear();

  return (
    <Card className='mb-1' style={{margin: ''}}>
        <Card.Header className='JobCardHeader'>
        { `${education?.School}, ${education?.City}. ${education?.Country}`.length <= 30 ?
            <Card.Text>
            {`${education?.School}, ${education?.City}. ${education?.Country}.`.slice(0, 30)}
            </Card.Text> :
            <Card.Text>
            {`${education?.School}, ${education?.City}. ${education?.Country}.`.slice(0, 27)}...
            </Card.Text>
        }
        </Card.Header>
        <Card.Body>
        { `${education?.LevelOfEducation}, ${education?.Course}`.length <= 30 ?
            <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>
            {`${education?.LevelOfEducation}: ${education?.Course}.`.slice(0, 30)}
            </Card.Subtitle> :
            <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>
            {`${education?.LevelOfEducation}: ${education?.Course}.`.slice(0, 27)}...
            </Card.Subtitle>
        }
            <Card.Text className="text-muted RemoveSpace">Start Date: {shortDateTime(education?.StartDate)}.</Card.Text>
            { minDate !== xpDate ?
            <Card.Text className="text-muted RemoveSpace">End Date: {shortDateTime(education?.EndDate)}.</Card.Text> :
            <Card.Text className="text-muted RemoveSpace">End Date: Running.</Card.Text>
            }
            <Link to={`/info/education/${education?.Id}`} style={{float: 'right'}}>Modify</Link>
        </Card.Body>
    </Card>
  )
}

export default EducationSummary