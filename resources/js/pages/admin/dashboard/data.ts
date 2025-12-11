import { addOrSubtractDaysFromDate, addOrSubtractMinutesFromDate } from '@/utils/date';

import { currency } from '@/context/constants';
import product1 from '@/images/products/p-1.png';
import product2 from '@/images/products/p-2.png';
import product3 from '@/images/products/p-3.png';
import product4 from '@/images/products/p-4.png';
import product5 from '@/images/products/p-5.png';
import product6 from '@/images/products/p-6.png';
import product7 from '@/images/products/p-7.png';

export type StatType = {
    title: string;
    icon: string;
    count: string;
};

export type OverViewChartType = {
    title: string;
    count: number;
    icon: string;
    variant?: string;
};

export type ActivityType = {
    title: string;
    icon: string;
    description: string;
    time: Date;
    variant: string;
};

export type SalesProductType = {
    id: string;
    name: string;
    image: string;
    date: Date;
    price: number;
    quantity: number;
    amount: string;
};

export type SalesOrderType = {
    id: string;
    image: string;
    title: string;
    price: number;
    totalPrice: number;
    quantity: number;
    orderStatus: 'Vendido' | 'Devuelto';
};

export const statData: StatType[] = [
    {
        title: 'Indicador 1',
        icon: 'solar:case-round-minimalistic-bold-duotone',
        count: '687.3k'
    },
    {
        title: 'Indicador 2',
        icon: 'solar:bill-list-bold-duotone',
        count: '9.62k',
    },
    {
        title: 'Indicador 3',
        icon: 'solar:wallet-money-bold-duotone',
        count: `${currency}98.24 USD`,
    },
    {
        title: 'Indicador 4',
        icon: 'solar:eye-bold-duotone',
        count: '87.94M',
    },
];

export const overViewChartData: OverViewChartType[] = [
    {
        title: 'Ingresos',
        count: 29.5,
        icon: 'tabler:square-rounded-arrow-down',
        variant: 'success',
    },
    {
        title: 'Gastos',
        count: 15.07,
        icon: 'tabler:square-rounded-arrow-up',
        variant: 'danger',
    },
    {
        title: 'Inversión',
        count: 3.6,
        icon: 'tabler:chart-infographic',
    },
    {
        title: 'Ahorros',
        count: 6.9,
        icon: 'tabler:pig',
    },
];

export const activityData: ActivityType[] = [
    {
        title: 'Vendiste un artículo',
        icon: 'tabler:basket',
        description: 'Paul Burgess acaba de comprar "Mi - Panel de Administración"!',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'info',
    },
    {
        title: 'Producto en el Mercado de Temas',
        icon: 'tabler:rocket',
        description: 'Revisor agregó Panel de Administración',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'primary',
    },
    {
        title: 'Robert Delaney',
        icon: 'tabler:message',
        description: 'Te envió un mensaje "¿Estás ahí?"',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'info',
    },
    {
        title: 'Audrey Tobey',
        icon: 'tabler:photo',
        description: 'Subió una foto "Error.jpg"',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'primary',
    },
    {
        title: 'Vendiste un artículo',
        icon: 'tabler:basket',
        description: 'Paul Burgess acaba de comprar "Mi - Panel de Administración"!',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'info',
    },
    {
        title: 'Producto en el Mercado de Temas',
        icon: 'tabler:rocket',
        description: 'Revisor agregó Panel de Administración',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'primary',
    },
    {
        title: 'Robert Delaney',
        icon: 'tabler:message',
        description: 'Te envió un mensaje "¿Estás ahí?"',
        time: addOrSubtractMinutesFromDate(15),
        variant: 'info',
    },
];

export const salesProductData: SalesProductType[] = [
    {
        id: '1',
        name: '	Camiseta ASOS Cintura Alta',
        image: product1,
        date: addOrSubtractDaysFromDate(50),
        price: 79.49,
        quantity: 82,
        amount: '6,518.18',
    },
    {
        id: '2',
        name: '	Sofá Individual Marco',
        image: product7,
        date: addOrSubtractDaysFromDate(150),
        price: 128.5,
        quantity: 37,
        amount: '4,754.50',
    },
    {
        id: '3',
        name: 'Audífonos Inteligentes',
        image: product4,
        date: addOrSubtractDaysFromDate(180),
        price: 39.99,
        quantity: 64,
        amount: '2,559.36',
    },
    {
        id: '4',
        name: 'Chaqueta Ligera',
        image: product5,
        date: addOrSubtractDaysFromDate(250),
        price: 20.0,
        quantity: 184,
        amount: '3,680.00',
    },
    {
        id: '5',
        name: 'Zapatos Marco',
        image: product6,
        date: addOrSubtractDaysFromDate(350),
        price: 28.49,
        quantity: 69,
        amount: '1,965.81',
    },
];

export const salesOrderData: SalesOrderType[] = [
    {
        id: '201',
        image: product6,
        title: 'Zapatos Marco',
        price: 29.99,
        totalPrice: 29.99,
        quantity: 1,
        orderStatus: 'Vendido',
    },
    {
        id: '202',
        image: product1,
        title: 'Camiseta Cintura Alta',
        price: 9.99,
        totalPrice: 29.97,
        quantity: 3,
        orderStatus: 'Vendido',
    },
    {
        id: '203',
        image: product3,
        title: 'Silla Cómoda',
        price: 49.99,
        totalPrice: 49.99,
        quantity: 1,
        orderStatus: 'Devuelto',
    },
    {
        id: '204',
        image: product4,
        title: 'Audífonos Inteligentes',
        price: 39.99,
        totalPrice: 39.99,
        quantity: 1,
        orderStatus: 'Vendido',
    },
    {
        id: '205',
        image: product2,
        title: 'Bolso para Laptop',
        price: 12.99,
        totalPrice: 51.99,
        quantity: 4,
        orderStatus: 'Vendido',
    },
];
