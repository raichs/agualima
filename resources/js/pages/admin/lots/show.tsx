import ComponentContainerCard from '@/components/ComponentContainerCard';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Lot } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

const ShowLotPage = () => {
    const { lot } = usePage<{ lot: Lot }>().props;

    return (
        <>
            <PageTitle title="Detalle de Lote" subTitle="Lotes" />
            <Row className="mb-3">
                <Col className="text-end">
                    <Link href={route('admin.lots.edit', lot.id)} className="btn btn-primary btn-sm me-2">
                        <IconifyIcon icon="tabler:edit" className="me-1" /> Editar
                    </Link>
                    <Link href={route('admin.lots.index')} className="btn btn-secondary btn-sm">
                        <IconifyIcon icon="tabler:arrow-left" className="me-1" /> Volver
                    </Link>
                </Col>
            </Row>
            <ComponentContainerCard title={`Lote: ${lot.code}`}>
                <Row>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Código</label>
                            <p className="form-control-plaintext">{lot.code}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <p className="form-control-plaintext">{lot.name}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Descripción</label>
                            <p className="form-control-plaintext">{lot.description || '-'}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Fecha de Creación</label>
                            <p className="form-control-plaintext">
                                {lot.created_at ? new Date(lot.created_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Última Actualización</label>
                            <p className="form-control-plaintext">
                                {lot.updated_at ? new Date(lot.updated_at).toLocaleString('es-ES') : '-'}
                            </p>
                        </div>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

ShowLotPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ShowLotPage;
