import MainLayout from '@/layouts/MainLayout';
import VarietyForm from './VarietyForm';

const CreateVarietyPage = () => {
    return (
        <VarietyForm
            title="Crear Variedad"
            subTitle="Variedades"
            cardTitle="Ingresa la información de la variedad"
        />
    );
};

CreateVarietyPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default CreateVarietyPage;
