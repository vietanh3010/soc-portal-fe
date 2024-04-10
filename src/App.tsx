import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { memo } from "react"
import { AppConfig } from "./common/AppConfig"
import { ThemeProvider } from "./components/theme-provider"
import AppRouter from "./routers/AppRouter"
import useI18n from "./hooks/useI18n"

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
    useI18n();
    
    return (
        <ThemeProvider defaultTheme="light" storageKey={AppConfig.UI_THEME_KEY}>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default memo(App)