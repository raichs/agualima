import MainLayout from '@/layouts/MainLayout';
import { Campaign } from '@/types';
import { usePage } from '@inertiajs/react';
import CampaignForm from './CampaignForm';

const EditCampaignPage = () => {
    const { campaign } = usePage<{
        campaign: Campaign;
    }>().props;

    return (
        <CampaignForm
            campaign={campaign}
            title="Editar Campaña"
            subTitle="Campañas"
            cardTitle="Actualiza la información de la campaña"
        />
    );
};

EditCampaignPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditCampaignPage;