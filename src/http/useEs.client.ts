import { AppConfig } from "@/common/AppConfig";
import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";

const createBaseInstance = (): AxiosInstance => {
    const axiosInstance = axios.create({
        // baseURL: `${AppConfig.ES.ENDPOINT_BASE}/${AppConfig.ES.INDEX}`,
        baseURL: `${AppConfig.ES.ENDPOINT_BASE}`
    });
    return axiosInstance;
}

const axiosInstance = createBaseInstance();


type ResultEsClient = {
    get: <T>(url: string, headers?: Record<string, string>) => Promise<T>,
    post: <T>(url: string, data: any, headers?: Record<string, string>) => Promise<T>,
    put: <T>(url: string, data: any, headers?: Record<string, string>) => Promise<T>,
    patch: <T>(url: string, data: any, headers?: Record<string, string>) => Promise<T>,
    delete: <T>(url: string, headers?: Record<string, string>) => Promise<T>,
}
const useEsClient = (): ResultEsClient => {

    useEffect(() => {
        // auth
        axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                return Promise.reject(error);
            },
        )
        axiosInstance.interceptors.request.use(
            (config) => {
                // config.headers.Authorization = `ApiKey ${AppConfig.ES.API_KEY}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        )
    }, [])

    const get = <T>(url: string, headers: Record<string, string> = {}) => {
        return axiosInstance.get<T>(
            url,
            {
                headers,
            }
        ) as Promise<T>
    }

    const post = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.post<T>(
            url,
            data,
            {
                headers,
            }
        ) as Promise<T>
    }

    const put = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.put<T>(
            url,
            data,
            {
                headers,
            }
        ) as Promise<T>
    }

    const patch = <T>(url: string, data: any, headers: Record<string, string> = {}) => {
        return axiosInstance.patch<T>(
            url,
            data,
            {
                headers,
            }
        ) as Promise<T>
    }

    const deleteFn = <T>(url: string, headers: Record<string, string> = {}) => {
        return axiosInstance.delete<T>(
            url,
            {
                headers,
            }
        ) as Promise<T>
    }

    return {
        get,
        post,
        put,
        patch,
        delete: deleteFn,
    }
}

export default useEsClient;