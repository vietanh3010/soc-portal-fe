
import { AppConfig } from "@/common/AppConfig";
import { Lang } from "@/types/types";
import { create } from "zustand";

type AppState = {
    lang: Lang,
}

type AppAction = {
    setLang: (lang: Lang) => void,
    reset: () => void,
}

const initialState: AppState = {
    lang: (localStorage.getItem(AppConfig.LANG_TOKEN) as Lang | undefined) ?? 'vi',
}

const useAppStore = create<AppState & AppAction>((set) => ({
    ...initialState,
    setLang: (lang: Lang) => set(() => ({ lang })),
    reset: () => set(initialState),
}))

export default useAppStore;