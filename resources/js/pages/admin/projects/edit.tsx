import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const projectSchema = yup.object({
    name: yup.string().required('El nombre del proyecto es requerido'),
    description: yup.string().optional().default(''),
});

type ProjectFormData = yup.InferType<typeof projectSchema>;

interface Project {
    id: number;
    name: string;
    description: string | null;
}

interface EditProjectPageProps {
    project: Project;
}

const EditProjectPage = ({ project }: EditProjectPageProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<ProjectFormData>({
        resolver: yupResolver(projectSchema),
        defaultValues: {
            name: project.name || '',
            description: project.description || '',
        },
    });

    const onSubmit = (data: ProjectFormData) => {
        setIsSubmitting(true);
        router.put(route('admin.projects.update', project.id), data, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <>
            <PageTitle title="Editar Proyecto" subTitle="Proyectos" />
            <ComponentContainerCard title="Editar información">
                <Row>
                    <Col xs={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col lg={6}>
                                    <div className="mb-3">
                                        <TextFormInput
                                            control={control}
                                            name="name"
                                            label="Nombre del Proyecto"
                                            placeholder="Ingrese el nombre del proyecto"
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="mb-3">
                                        <TextAreaFormInput
                                            control={control}
                                            name="description"
                                            label="Descripción"
                                            placeholder="Ingrese la descripción del proyecto"
                                            rows={5}
                                            containerClassName="mb-3"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end gap-2">
                                <Link href={route('admin.projects.index')} className="btn btn-light">
                                    Cancelar
                                </Link>
                                <Button type="submit" variant="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

EditProjectPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditProjectPage;
