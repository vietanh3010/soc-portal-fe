import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { memo } from "react"
import AppRouter from "./routers/AppRouter"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: true,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 1,
            retryDelay: 3000,
        },
    },
})

const App = (): JSX.Element => {

    return (
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    )
}

export default memo(App)