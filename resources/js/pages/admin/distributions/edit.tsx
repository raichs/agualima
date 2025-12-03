import MainLayout from '@/layouts/MainLayout';
import { Distribution } from '@/types';
import { usePage } from '@inertiajs/react';
import DistributionForm from './DistributionForm';

const EditDistributionPage = () => {
    const { distribution } = usePage<{
        distribution: Distribution;
    }>().props;

    return (
        <DistributionForm
            distribution={distribution}
            title="Editar Distribución"
            subTitle="Distribuciones"
            cardTitle="Actualiza la información de la distribución"
        />
    );
};

EditDistributionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditDistributionPage;
