import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { shortDateTime } from '../../helpers/Helpers';

const ExperienceSummary = ( { experience }) => {
    const minDate = new Date('0001-01-01T00:00:00').getFullYear();
    const xpDate = new Date(experience?.EndDate).getFullYear();

  return (
    <Card className='mb-2'>
        <Card.Header className='JobCardHeader'>
        { `${experience?.Designation}`.length <= 30 ?
            <Card.Text>
            {`${experience?.Designation}`.slice(0, 30)}
            </Card.Text> :
            <Card.Text>
            {`${experience?.Designation}`.slice(0, 27)}...
            </Card.Text>
        }
        </Card.Header>
        <Card.Body>
            <Card.Subtitle style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}}>
            { `${experience?.Company}. ${experience?.Location}`.length <= 30 ?
                <Card.Text>
                {`${experience?.Company}. ${experience?.Location}`.slice(0, 30)}
                </Card.Text> :
                <Card.Text>
                {`${experience?.Company}. ${experience?.Location}`.slice(0, 27)}...
                </Card.Text>
            }
            </Card.Subtitle>
            <Card.Text style={{borderBottom: '1px solid #eee', paddingBottom: '0.5rem'}} dangerouslySetInnerHTML={{ __html: `${experience?.Descriptions}`.slice(0, 200) }}></Card.Text>    
            <Card.Text className="text-muted RemoveSpace"><strong>Start Date</strong>: {shortDateTime(experience?.StartDate)}.</Card.Text>
            { minDate !== xpDate ? 
                <Card.Text className="text-muted RemoveSpace"><strong>End Date</strong>: {shortDateTime(experience?.EndDate)}.</Card.Text> :
                <Card.Text className="text-muted RemoveSpace"><strong>End Date</strong>: Current.</Card.Text>
            }
            <Link to={`/info/experience/${experience?.Id}`} style={{float: 'right'}}>See Details</Link>
        </Card.Body>
    </Card>
  )
}

export default ExperienceSummary