import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { TrashIcon } from "@radix-ui/react-icons";
import { memo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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
        label: "Field 1",
        value: "field1"
    },
    {
        label: "Field 2",
        value: "field2"
    },
    {
        label: "Field 3",
        value: "field3"
    },
    {
        label: "Field 4",
        value: "field4"
    },
    {
        label: "Field 5",
        value: "field5"
    },
]


const MetricsForms = (): JSX.Element => {
    const { control, handleSubmit } = useForm();
      const { fields, append, remove } = useFieldArray({
        control,
        name: "test"
      });

    const onSubmit = (formValues: any) => {
        console.log(formValues)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                fields?.length ?
                
                <div className="flex flex-col space-y-2">
                    {
                        fields.map((field, i) => 
                        <div
                            className="flex space-x-2 animate-fadedown"
                            key={i}>
                            <Controller
                                control={control}
                                name={field.id}
                                render={({field}) => {
    
                                    return (
                                        <Select {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={"Select metrics"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    METRICS_DEFINE.map(item => 
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}>
                                                            {item.label}
                                                            </SelectItem>
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                    )
                                }}/>
    
                            <Controller
                                control={control}
                                name={field.id}
                                render={({field}) => {
    
                                    return (
                                        <Select {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder={"Select fields"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    FIELDS_DEFINE.map(item => 
                                                        <SelectItem
                                                            key={item.value}
                                                            value={item.value}>
                                                            {item.label}
                                                            </SelectItem>
                                                    )
                                                }
                                            </SelectContent>
                                        </Select>
                                    )
                                }}/>

                            <Button
                                size="icon"
                                variant="destructive"
                                onClick={() => remove(i)}>
                                <TrashIcon/>
                            </Button>
                        </div>
                    )
                    }
                </div>
                :
                <div>empty</div>
            }
            <Button onClick={() => append({})}>add</Button>
        </form>
    )
}

export default memo(MetricsForms)