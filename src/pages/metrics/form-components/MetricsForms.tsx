
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import useMetricService from "@/service-hooks/useMetric.service";
import { EsResponse, RequestItem } from "@/types/response.type";
import { CustomFormItem, MetricForm } from "@/types/types";
import useMetricsStore from "@/zustand/metrics.slice";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { memo } from "react";
import { ControllerRenderProps, FieldValues, useFieldArray, useForm } from "react-hook-form";

const METRICS_DEFINE = [
    {
        label: "Average",
        value: "avg"
    },
    {
        label: "Min",
        value: "min"
    },
    {
        label: "Max",
        value: "max"
    },
    {
        label: "Sum",
        value: "sum"
    }
]

const FIELDS_DEFINE = [
    {
        label: "value",
        value: "value"
    },
]

const FORM_DEFINE: CustomFormItem[] = [
    {
        type: "select",
        name: "metric",
        label: "metric",
        placeholder: "Select metrics",
        options: METRICS_DEFINE,
    },
    {
        type: "select",
        name: "field",
        label: "field",
        placeholder: "Select fields",
        options: FIELDS_DEFINE,
    }
]

const ARRAY_FORM_NAME = "result";
type FormType = {
    [ARRAY_FORM_NAME]: MetricForm[]
}
const MetricsForms = (): JSX.Element => {
    const { aggData } = useMetricService();
    const { setRequestResults } = useMetricsStore();
    const form = useForm();
    const { fields, append, remove } = useFieldArray({
        control: form.control ,
        name: ARRAY_FORM_NAME,
    });

    const mutation = useMutation({
        mutationFn: (payload: MetricForm[]) => aggData(payload),
        onSuccess: (response: EsResponse<RequestItem>) => {
            setRequestResults(response);
        }
    })

    const onSubmit = (formValues: FormType) => {
        const body = formValues[ARRAY_FORM_NAME];
        mutation.mutateAsync(body);
    }

    const renderItemByType = (formItem: CustomFormItem, field: ControllerRenderProps<FieldValues, string>) => {
        switch(formItem.type) {
            case "select": {
                return (
                    <FormItem>
                        <FormLabel>{formItem.label}</FormLabel>
                        <FormControl>
                            <Select 
                                {...field} 
                                onValueChange={v => field.onChange(v)}
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={formItem.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        formItem.options.map(item => 
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }
            default: {
                return <></>
            }
        }
    }

    return (
        <Form {...form}>
            <form 
                className="flex flex-col space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}>
                {
                    fields?.length ?
                    
                    <div className="flex flex-col space-y-2">
                        {
                            fields.map((field, i) => 
                            <div
                                className="flex space-x-2 animate-fadedown"
                                key={field.id}>
                                {
                                    FORM_DEFINE.map(formItem => 
                                        <FormField
                                            key={formItem.name}
                                            control={form.control}
                                            name={`${ARRAY_FORM_NAME}.${i}.${formItem.name}` as string}
                                            render={({field}) => {

                                                return (
                                                    <>
                                                        {renderItemByType(formItem, field)}
                                                    </>
                                                )
                                            }}/>
                                    )
                                }
                                <div className="h-auto flex items-end">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        type="button" 
                                        onClick={() => remove(i)}>
                                        <TrashIcon/>
                                    </Button>
                                </div>
                            </div>
                        )
                        }
                    </div>
                    :
                    <div>add a metric</div>
                }
                <div className="flex space-x-2 items-center">
                    <Button type="button" onClick={() => append({})}>add</Button>
                    <Button type="submit">submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default memo(MetricsForms)