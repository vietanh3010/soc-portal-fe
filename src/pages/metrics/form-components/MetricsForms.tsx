
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import CFieldsetGroup from "@/custom-components/custom/CFieldsetGroup";
import CTooltip from "@/custom-components/custom/CTooltip";
import useCustomTranslation from "@/hooks/useCustomTranslation";
import useMetricService from "@/service-hooks/useMetric.service";
import { EsResponse, RequestItem } from "@/types/response.type";
import { CustomFormItem, MetricForm } from "@/types/types";
import useMetricsStore from "@/zustand/metrics.slice";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";
import { ControllerRenderProps, FieldValues, useFieldArray, useForm } from "react-hook-form";

const AGGREGATIONS_DEFINE = [
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

const ARRAY_FORM_NAME = "result";
type FormType = {
    [ARRAY_FORM_NAME]: MetricForm[]
}
const MetricsForms = (): JSX.Element => {
    const { T } = useCustomTranslation();
    const { aggData, getFields } = useMetricService();
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

    const { data: dataFields } = useQuery({
        queryFn: getFields,
        queryKey: ["GET_METRIC_FIELDS"],
    })


    const formDefine: CustomFormItem<MetricForm>[] = useMemo(() => ([
        {
            type: "select",
            name: "aggregation",
            label: "aggregation",
            placeholder: "Select aggregations",
            options: AGGREGATIONS_DEFINE,
        },
        {
            type: "select",
            name: "field",
            label: "field",
            placeholder: "Select fields",
            options: (dataFields ?? []).map(field => ({label: field, value: field})),
        }
    ]), [dataFields])

    const onSubmit = (formValues: FormType) => {
        const body = formValues[ARRAY_FORM_NAME];
        mutation.mutateAsync(body);
    }

    const renderItemByType = (formItem: CustomFormItem<MetricForm>, field: ControllerRenderProps<FieldValues, string>) => {
        switch(formItem.type) {
            case "select": {
                return (
                    <FormItem>
                        <FormLabel>{T(formItem.label)}</FormLabel>
                        <FormControl>
                            <Select 
                                {...field} 
                                onValueChange={v => field.onChange(v)}
                                >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={T(formItem.placeholder)} />
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
                            <CFieldsetGroup 
                                key={field.id}
                                title={`#${i+1}`}
                                className="relative">
                                <div className="flex space-x-2 ">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 animate-fadedown">
                                    {
                                        formDefine.map(formItem => 
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
                                    </div>
                                    <CTooltip title={T("remove")}>
                                        <Button 
                                            variant="secondary"
                                            className="!absolute !right-[-18px] !top-[-20px] !p-0 !rounded-full animate-fadedown"
                                            onClick={() => remove(i)}
                                            size="icon">
                                            <TrashIcon/>
                                        </Button>
                                    </CTooltip>
                                </div>
                            </CFieldsetGroup>
                        )
                        }
                    </div>
                    :
                    <div>add a metric</div>
                }
                <div className="flex space-x-2 items-center">
                    <Button type="button" onClick={() => append({})}>
                        {T("add")}
                    </Button>
                    <Button type="submit">
                        {T("submit")}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default memo(MetricsForms)