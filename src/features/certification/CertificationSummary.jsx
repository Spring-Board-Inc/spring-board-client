import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shortDateTime } from "../../helpers/Helpers";

const CertificationSummary = ( { certification }) => {
  const minDate = new Date('0001-01-01T00:00:00').getFullYear();
  const xpDate = new Date(certification?.IssuingDate).getFullYear();

  return (
    <Card className='mb-1'>
        <Card.Header className='JobCardHeader'>
        { `${certification?.Name}`.length <= 30 ?
            <Card.Text>
            {`${certification?.Name}.`.slice(0, 30)}
            </Card.Text> :
            <Card.Text>
            {`${certification?.Name}.`.slice(0, 27)}...
            </Card.Text>
        }
        </Card.Header>
        <Card.Body>
        { `${certification?.IssuingBody}`.length <= 30 ?
            <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.3rem'}}>
            {`${certification?.IssuingBody}`.slice(0, 30)}
            </Card.Subtitle> :
            <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.3rem'}}>
            {`${certification?.IssuingBody}`.slice(0, 27)}...
            </Card.Subtitle>
        }
        {
            minDate !== xpDate ?
            <Card.Text className="text-muted RemoveSpace">Issuing Date: {shortDateTime(certification.IssuingDate)}.</Card.Text> :
            <Card.Text className="text-muted RemoveSpace">Issuing Date: Running.</Card.Text>
        }
        <Link to={`/info/certification/${certification?.Id}`} style={{float: 'right'}}>See Details</Link>
        </Card.Body>
    </Card>
  )
}

export default CertificationSummary