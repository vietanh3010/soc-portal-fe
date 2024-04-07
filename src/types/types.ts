import { SelectProps } from "@radix-ui/react-select";


export type CustomFormItem = {
    name: string,
    label: React.ReactNode,
} & (
        {
            type: "select",
            placeholder?: string,
            options: Array<{ label: string, value: string }>
        } & SelectProps
    )


export type MetricForm = {
    metric: string,
    field: string,
}