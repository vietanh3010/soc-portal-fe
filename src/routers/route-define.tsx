import { lazy } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

const EsHomeModuleModule = lazy(() => import('@/pages/es-home/index'));

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
                element: <EsHomeModuleModule/>,
            },
        ]
    }
]

export default routes;