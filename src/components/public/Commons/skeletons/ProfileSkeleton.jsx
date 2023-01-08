import './Skeleton.css';
import { Row, Col } from 'react-bootstrap';

const ProfileSkeleton = () => {
  return (
    <div className="card p-3" id="card-link" target="_blank">
        <Row className='card__header'>
            <Col sm={12} md={5} className='centered'>
                <img className="header__img skeleton" id="logo-img" alt="" />
            </Col>
            <Col sm={12} md={7} className='centered d-flex flex-column p-2'>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text" style={{float: 'right !important', width: '30%'}}></div>
            </Col>
        </Row>
        <Row className='card__body centered p-2'>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
        </Row>
    </div>
  )
}

export default ProfileSkeleton