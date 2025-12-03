import MainLayout from '@/layouts/MainLayout';
import { Variety } from '@/types';
import { usePage } from '@inertiajs/react';
import VarietyForm from './VarietyForm';

const EditVarietyPage = () => {
    const { variety } = usePage<{
        variety: Variety;
    }>().props;

    return (
        <VarietyForm
            variety={variety}
            title="Editar Variedad"
            subTitle="Variedades"
            cardTitle="Actualiza la información de la variedad"
        />
    );
};

EditVarietyPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default EditVarietyPage;
