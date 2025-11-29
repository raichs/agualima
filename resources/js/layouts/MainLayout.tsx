import VerticalLayout from '@/layouts/VerticalLayout';
import { ChildrenType } from '@/types/component-props';
import FlashMessages from '@/components/FlashMessages';

const MainLayout = ({ children }: ChildrenType) => {
    return (
        <>
            <FlashMessages />
            <VerticalLayout>{children}</VerticalLayout>
        </>
    );
};

export default MainLayout;
