import { EsResponse, RequestItem } from "@/types/response.type";
import { create } from "zustand";

type MetricsState = {
    requestResults: EsResponse<RequestItem> | undefined,
}

type MetricsAction = {
    setRequestResults: (requestResults: EsResponse<RequestItem>) => void,
    reset: () => void,
}

const initialState: MetricsState = {
    requestResults: undefined
}

const useMetricsStore = create<MetricsState & MetricsAction>((set) => ({
    ...initialState,
    setRequestResults: (requestResults: EsResponse<RequestItem>) => set(() => ({ requestResults })),
    reset: () => set(initialState),
}))

export default useMetricsStore;