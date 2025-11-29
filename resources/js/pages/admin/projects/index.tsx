import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination/Pagination';
import Table from '@/components/Table/Table';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { PaginatedData, Project } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {  Card, CardFooter, CardHeader, Col, Row } from 'react-bootstrap';

const ProjectsPage = () => {
    const { projects } = usePage<{
        projects: PaginatedData<Project>;
    }>().props;

    const {
        data,
        meta: { links }
    } = projects;

    return (
        <>
            <PageTitle title="Proyectos" subTitle="Administración" />
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex align-items-center justify-content-between border-bottom border-light">
                            <h4 className="header-title">Lista de Proyectos</h4>
                            <div>
                                <Link href={route('admin.projects.create')} className="btn btn-primary">
                                    <IconifyIcon icon="tabler:plus" className="me-1" /> Nuevo Proyecto
                                </Link>
                            </div>
                        </CardHeader>
                        <Table
                            columns={[
                                { label: 'Nombre', name: 'name' },
                                { label: 'Descripción', name: 'description' },
                            ]}
                            rows={data}
                            showRoute="admin.projects.show"
                            editRoute="admin.projects.edit"
                            deleteRoute="admin.projects.destroy"
                            deleteOptions={{
                                title: '¿Eliminar proyecto?',
                                text: 'Esta acción no se puede deshacer',
                                confirmButtonText: 'Sí, eliminar',
                                cancelButtonText: 'Cancelar',
                                successTitle: '¡Eliminado!',
                                successText: 'El proyecto ha sido eliminado exitosamente'
                            }}
                            emptyMessage="No hay proyectos registrados"
                        />
                        <CardFooter>
                            <Pagination links={links} />
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

ProjectsPage.layout = (page: React.ReactNode) => (
  <MainLayout children={page} />
);

export default ProjectsPage;
