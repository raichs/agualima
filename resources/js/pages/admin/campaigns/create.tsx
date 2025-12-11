import MainLayout from '@/layouts/MainLayout';
import CampaignForm from './CampaignForm';

const CreateCampaignPage = () => {
    return (
        <CampaignForm
            title="Crear Campaña"
            subTitle="Campañas"
            cardTitle="Ingresa la información de la campaña"
        />
    );
};

CreateCampaignPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateCampaignPage;