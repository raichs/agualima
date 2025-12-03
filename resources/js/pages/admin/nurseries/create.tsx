import MainLayout from '@/layouts/MainLayout';
import NurseryForm from '@/pages/admin/nurseries/NurseryForm';

const CreateNurseryPage = () => {
    return (
        <NurseryForm
            title="Crear Vivero"
            subTitle="Viveros"
            cardTitle="Ingresa la información del vivero"
        />
    );
};

CreateNurseryPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateNurseryPage;
