import CustomFlatpickr from '@/components/CustomFlatpickr';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Head, usePage } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { PageProps } from '@/types';

const DashboardPageTitle = () => {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Sales" />
            <Row>
                <Col xs={12}>
                    <div className="page-title-head d-flex align-items-sm-center flex-sm-row flex-column">
                        <div className="flex-grow-1">
                            <h4 className="fs-18 fw-semibold m-0">Bienvenido, {auth.user?.name}</h4>
                        </div>
                        {/* <div className="mt-3 mt-sm-0">
                            <form>
                                <Row className="g-2 mb-0 align-items-center">
                                    <Col sm={'auto'}>
                                        <div className="input-group">
                                            <CustomFlatpickr
                                                className="form-control border-0 shadow"
                                                options={{
                                                    defaultDate: ['2016-10-10', '2016-10-20'],
                                                    dateFormat: 'Y-m-d',
                                                    mode: 'range',
                                                    enableTime: false,
                                                }}
                                            />
                                            <span className="input-group-text bg-primary border-primary text-white">
                                                <IconifyIcon icon="tabler:calendar" className="fs-15" />
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </div> */}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default DashboardPageTitle;
