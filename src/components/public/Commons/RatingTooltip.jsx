import { Row, Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import { FaStar, FaQuestionCircle} from 'react-icons/fa';

const RatingTooltip = ( { skill, rating }) => {
  return (
    <Row>
        <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
            <Tooltip {...props}>
                <FaStar color={rating}/> {skill?.Level}
            </Tooltip>)}
            placement="top"><Button className="DeButton"><FaQuestionCircle color="#005611"/></Button>
        </OverlayTrigger>
    </Row>
  )
}

export default RatingTooltip