import { SelectProps } from "@radix-ui/react-select";

export type Lang = 'en' | 'vi';
export type CustomFormItem<T> = {
    name: keyof T,
    label: string,
} & (
        {
            type: "select",
            placeholder?: string,
            options: Array<{ label: string, value: string }>
        } & SelectProps
    )


export type MetricForm = {
    aggregation: string,
    field: string,
}