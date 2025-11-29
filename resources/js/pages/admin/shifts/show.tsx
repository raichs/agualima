import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Shift } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

const ShowShiftPage = () => {
    const { shift } = usePage<{ shift: Shift }>().props;

    return (
        <>
            <PageTitle title="Detalle de Turno" subTitle="Turnos" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.shifts.edit', shift.id)} className="btn btn-primary btn-sm me-2">
                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                    </Link>
                    <Link href={route('admin.shifts.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title={`Turno: ${shift.name}`}>
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <p className="form-control-plaintext">{shift.name}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Creación</label>
                            <p className="form-control-plaintext">
                                {shift.created_at ? new Date(shift.created_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Última Actualización</label>
                            <p className="form-control-plaintext">
                                {shift.updated_at ? new Date(shift.updated_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowShiftPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowShiftPage;
