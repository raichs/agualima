import { currentYear } from '@/context/constants';
import { Link } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="page-container">
                <Row>
                    <Col md={12}>
                        <div className="text-md-end footer-links d-none d-md-block">
                            {currentYear} © Agualima{' '}
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
