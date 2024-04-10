


export class AppConfig {

    static UI_THEME_KEY = "theme";
    static LANG_TOKEN = 'lang';
    static readonly ES_CREDENTIAL = {
        ENDPOINT_BASE: import.meta.env.VITE_APP_ES_ENDPOINT_BASE,
        API_KEY: import.meta.env.VITE_APP_ES_API_KEY,
        INDEX: import.meta.env.VITE_APP_ES_INDEX,
    }

    static readonly ES = {
        SEARCH: `/_search`,
        GET_FIELDS: `/get_all_fields`
    }
}