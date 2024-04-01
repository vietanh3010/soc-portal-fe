

import { Suspense, memo } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './route-define'

const router = createBrowserRouter(
    routes.map((route) => ({
        // ..._.omit(route, 'canGuard') as RouteObject,
        ...route,
        element: (
            <Suspense fallback={"Loading..."}>
                {route.element}
            </Suspense>
        ),
    }))
)

const AppRouter = (): JSX.Element => {
    
    return <RouterProvider router={router} />
}
export default memo(AppRouter)
