import MainLayout from '@/layouts/MainLayout';
import { Lot } from '@/types';
import { usePage } from '@inertiajs/react';
import LotForm from './LotForm';

const EditLotPage = () => {
    const { lot } = usePage<{
        lot: Lot;
    }>().props;

    return (
        <LotForm
            lot={lot}
            title="Editar Lote"
            subTitle="Lotes"
            cardTitle="Actualiza la información del lote"
        />
    );
};

EditLotPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditLotPage;
