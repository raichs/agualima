import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { statData, StatType } from '../data';

const StatCard = ({ count, icon, title }: StatType) => {
    return (
        <Card>
            <CardBody>
                <h5 className="text-muted fs-13 text-uppercase" title="Number of Orders">
                    {title}
                </h5>
                <div className="d-flex align-items-center justify-content-center gap-2 my-2 py-1">
                    <div className="user-img fs-42 flex-shrink-0">
                        <span className="avatar-title text-bg-primary rounded-circle fs-22">
                            <IconifyIcon icon={icon} />
                        </span>
                    </div>
                    <h3 className="mb-0 fw-bold">{count}</h3>
                </div>
            </CardBody>
        </Card>
    );
};

const Stat = () => {
    return (
        <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1 text-center">
            {statData.map((item, idx) => (
                <Col key={idx}>
                    <StatCard {...item} />
                </Col>
            ))}
        </Row>
    );
};

export default Stat;
