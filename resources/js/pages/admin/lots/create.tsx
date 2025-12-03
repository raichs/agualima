import MainLayout from '@/layouts/MainLayout';
import LotForm from './LotForm';

const CreateLotPage = () => {
    return (
        <LotForm
            title="Crear Lote"
            subTitle="Lotes"
            cardTitle="Ingresa la información del lote"
        />
    );
};

CreateLotPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateLotPage;
