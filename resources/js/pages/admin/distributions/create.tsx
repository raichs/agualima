import MainLayout from '@/layouts/MainLayout';
import DistributionForm from './DistributionForm';

const CreateDistributionPage = () => {
    return (
        <DistributionForm
            title="Crear Distribución"
            subTitle="Distribuciones"
            cardTitle="Ingresa la información de la distribución"
        />
    );
};

CreateDistributionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateDistributionPage;
