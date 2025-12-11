import IconifyIcon from '@/components/wrappers/IconifyIcon';
import MainLayout from '@/layouts/MainLayout';
import { Card, Col, Row } from 'react-bootstrap';
import Activity from './Components/Activity';
import BrandsListingCard from './Components/BrandsListingCard';
import EstimatedCard from './Components/EstimatedCard';
import Orders from './Components/Orders';
import OverviewChart from './Components/OverviewChart';
import DashboardPageTitle from './Components/DashboardPageTitle';
import SellingProductsCard from './Components/SellingProductsCard';
import Stat from './Components/Stat';
import TrafficSourceChart from './Components/TrafficSourceChart';

const DashboardPage = () => {
    return (
        <>
            <DashboardPageTitle />
            <Row>
                <Col>
                    <Stat />
                    <Row>
                        <OverviewChart />
                        <TrafficSourceChart />
                    </Row>
                    <Row>
                        <Col xxl={6}>
                            <BrandsListingCard />
                        </Col>
                        <Col xxl={6}>
                            <SellingProductsCard />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

DashboardPage.layout = (page: React.ReactNode) => (
  <MainLayout children={page} />
);

export default DashboardPage;
