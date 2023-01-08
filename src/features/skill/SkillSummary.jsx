import { Row, Card, Badge, Col, Button } from "react-bootstrap";
import RatingTooltip from "../../components/public/Commons/RatingTooltip";
import { FaEdit, FaStar, FaTimes } from "react-icons/fa";
import { ratingColor, rating } from "../../helpers/Helpers";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../auth/authSlice";
import { toast } from "react-toastify";
import { useDeleteUserSkillMutation } from "../api/userSkillApi";

const SkillSummary = ( { skill }) => {
    const [deleteUserSkill, { isSuccess, isError, error }] = useDeleteUserSkillMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect( () => {
        if(isError){
            if(error?.status === 401){
                dispatch(logout())
                navigate('/login', { replace: true });
                toast.error('Please re-authenticate to continue');
            } else {
                toast.error(error?.data?.Message);
            }
        }
    }, [isError, error, navigate, dispatch])

    useEffect(() => {
        if(isSuccess){
            toast.success("Record deleted successfully");
        }
    }, [isSuccess])

    const onDelete = async () => {
        if(skill){
            const ids = { skillId: skill?.SkillId, userInfoId: skill?.UserInformationId }
            await deleteUserSkill(ids);
        }
    }
  return (
    <Card className="mb-1">
        <Card.Body>
            <Card.Subtitle>
            <Row>
                <Col xs={10}>
            { `${skill?.Skill}`.length <= 30 ?
            <>
                <Badge className='JobCardBadge' pill bg="secondary">
                {`${skill?.Skill}`.slice(0, 30)}
                </Badge>{' '} <FaStar color={ratingColor(skill?.Level)} />
                </> :
                <>
                <Badge className='JobCardBadge' pill bg="secondary">
                {`${skill?.Skill}`.slice(0, 30)}...
                </Badge>{' '} <FaStar color={rating?.Level}/> </>
            }
            </Col>
            <Col xs={2}>
                <RatingTooltip
                    skill={skill}
                    rating={ratingColor(skill?.Level)}
                />
            </Col>
            </Row>
            </Card.Subtitle>
            <Button className="DeButton m-1" style={{float: 'right'}} onClick={onDelete}>
                <FaTimes color="red"/>
            </Button>
            <Button className="DeButton m-1" style={{float: 'right'}}>
                <Link to={`${skill?.SkillId}/edit`}  className='EditLink'>
                    <FaEdit color="blue"/>
                </Link>
            </Button>
        </Card.Body>
    </Card>
  )
}

export default SkillSummary