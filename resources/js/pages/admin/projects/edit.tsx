import MainLayout from '@/layouts/MainLayout';
import ProjectForm from './ProjectForm';

interface Project {
    id: number;
    name: string;
    description: string | null;
}

interface EditProjectPageProps {
    project: Project;
}

const EditProjectPage = ({ project }: EditProjectPageProps) => {
    return (
        <ProjectForm
            project={project}
            title="Editar Proyecto"
            subTitle="Proyectos"
            cardTitle="Editar información"
        />
    );
};

EditProjectPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditProjectPage;
