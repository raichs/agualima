import FallbackLoading from '@/components/FallbackLoading';
import LogoBox from '@/components/LogoBox';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimpleBar from 'simplebar-react';
import { useMenuItems } from '@/helpers/menu';

import { useLayoutContext } from '@/context/useLayoutContext';
import coffeeImg from '@/images/coffee-cup.svg';
import { lazy, Suspense } from 'react';
import { Button } from 'react-bootstrap';
import HoverMenuToggle from './components/HoverMenuToggle';

const AppMenu = lazy(() => import('./components/AppMenu'));

const VerticalNavigationBar = () => {
    const { toggleBackdrop } = useLayoutContext();
    const menuItems = useMenuItems();

    return (
        <div className="sidenav-menu" id="leftside-menu-container">
            <LogoBox />
            <HoverMenuToggle />
            <button onClick={toggleBackdrop} className="button-close-fullsidebar">
                <span>
                    <IconifyIcon icon="tabler:x" className="align-middle" />
                </span>
            </button>
            <SimpleBar>
                <Suspense fallback={<FallbackLoading />}>
                    <AppMenu menuItems={menuItems} />
                    <div className="clearfix" />
                </Suspense>
            </SimpleBar>
        </div>
    );
};

export default VerticalNavigationBar;
