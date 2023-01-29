import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap';
import { FaStar, FaQuestionCircle} from 'react-icons/fa';
import { skillLevels, rating } from '../../../helpers/Helpers';

const SkillRatingsTooltip = () => {
  return (
    <span>
        <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
            <Tooltip {...props}>
                {
                  skillLevels && skillLevels.map( level => (
                    <>{level} <FaStar color={rating[level]}/> </>
                  ))
                }
            </Tooltip>)}
            placement="top"><Button className="DeButton"><FaQuestionCircle color="#005611"/></Button>
        </OverlayTrigger>
    </span>
  )
}

export default SkillRatingsTooltip