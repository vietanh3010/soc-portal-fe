import MainLayout from '@/layouts/MainLayout';
import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const MetricsModule = lazy(() => import('@/pages/metrics/index'));

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <MainLayout>
                <Outlet/>
            </MainLayout>
        ),
        children: [
            {
                path: '',
                index: true,
                element: <Navigate to="/metrics"/>,
            },
            {
                path: 'metrics',
                element: <MetricsModule/>,
            },
        ]
    }
]

export default routes;