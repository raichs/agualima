import MainLayout from '@/layouts/MainLayout';
import ProjectForm from './ProjectForm';

const CreateProjectPage = () => {
    return (
        <ProjectForm
            title="Nuevo Proyecto"
            subTitle="Proyectos"
            cardTitle="Ingresa la información"
        />
    );
};

CreateProjectPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateProjectPage;
