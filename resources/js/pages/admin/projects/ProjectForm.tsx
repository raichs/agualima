import ComponentContainerCard from '@/components/ComponentContainerCard';
import TextFormInput from '@/components/form/TextFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import PageTitle from '@/components/PageTitle';
import { router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const projectSchema = yup.object({
    name: yup.string().required('El nombre del proyecto es requerido'),
    description: yup.string().default(''),
});

type ProjectFormData = yup.InferType<typeof projectSchema>;

interface Nursery {
    id: number;
    name: string;
}

interface Project {
    id: number;
    name: string;
    description: string | null;
    nursery?: Nursery;
}

interface ProjectFormProps {
    project?: Project;
    title: string;
    subTitle: string;
    cardTitle: string;
}

const ProjectForm = ({ project, title, subTitle, cardTitle }: ProjectFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { handleSubmit, control } = useForm<ProjectFormData>({
        resolver: yupResolver(projectSchema),
        defaultValues: {
            name: project?.name || '',
            description: project?.description || '',
        },
    });

    const onSubmit = (data: ProjectFormData) => {
        setIsSubmitting(true);
        if (project) {
            router.put(route('admin.projects.update', project.id), data, {
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post(route('admin.projects.store'), data, {
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    return (
        <>
            <PageTitle title={title} subTitle={subTitle} />
            <ComponentContainerCard title={cardTitle}>
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
                                    {isSubmitting ? (project ? 'Actualizando...' : 'Guardando...') : (project ? 'Actualizar' : 'Guardar')}
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </ComponentContainerCard>
        </>
    );
};

export default ProjectForm;
