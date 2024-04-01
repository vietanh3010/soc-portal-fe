import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const EsHomeModule = lazy(() => import('@/pages/es-home/index'));
const MetricsModule = lazy(() => import('@/pages/metrics/index'));

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Outlet/>,
        children: [
            {
                path: '',
                index: true,
                element: <Navigate to="/es"/>,
            },
            {
                path: 'es',
                element: <EsHomeModule/>,
            },
            {
                path: 'metrics',
                element: <MetricsModule/>,
            },
        ]
    }
]

export default routes;