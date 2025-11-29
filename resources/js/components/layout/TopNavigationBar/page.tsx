import FallbackLoading from '@/components/FallbackLoading';
import LogoBox from '@/components/LogoBox';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Suspense } from 'react';
import Apps from './components/Apps';
import Country from './components/Country';
import HorizontalToggle from './components/HorizontalToggle';
import LeftSideBarToggle from './components/LeftSideBarToggle';
import Notifications from './components/Notifications';
import PagesDropdown from './components/PagesDropdown';
import ProfileDropdown from './components/ProfileDropdown';
import ThemeCustomizerToggle from './components/ThemeCustomizerToggle';
import ThemeModeToggle from './components/ThemeModeToggle';

const TopNavigationBarPage = () => {
    return (
        <header className="app-topbar">
            <div className="page-container topbar-menu">
                <div className="d-flex align-items-center gap-2">
                    <LogoBox />
                    <LeftSideBarToggle />
                    <HorizontalToggle />
                    {/* <Apps /> */}
                    {/* <PagesDropdown /> */}
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Suspense fallback={<FallbackLoading />}>
                        <Notifications />
                    </Suspense>
                    <ThemeCustomizerToggle />
                    <ThemeModeToggle />
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    );
};

export default TopNavigationBarPage;
