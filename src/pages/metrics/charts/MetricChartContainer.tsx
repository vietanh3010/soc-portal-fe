import ChartJs from "@/custom-components/charts/ChartJs";
import useMetricService from "@/service-hooks/useMetric.service";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { memo, useEffect, useState } from "react";

const RESULT_FIELDS = [
    "metric_0",
    "metric_1",
    "metric_2",
    "timestamp",
  ]

function buildEsPayload() {
    return {
        page: { size: 50, current: 1}, // pagination
        query: "", // query string,
        result_fields: RESULT_FIELDS.reduce((p,c) => {
            return {
                ...p,
                ...{[c]: {
                    raw: {},
                    snippet: {size: 100, fallback: true}
                }}
            }
        },{})
    }
}
const MetricChartContainer = (): JSX.Element => {
    const { getData } = useMetricService();
    const [barChartConfig, setBarChartConfig] = useState<any>(undefined);

    const mutation = useMutation({
        mutationFn: (payload: any) => getData(payload),
        onSuccess: (response: any) => {
            console.log(response)
            const chartConfig = {
                type: 'bar',
                data: {
                    labels: response.results.map((v: any) => dayjs(Number(v.timestamp.raw)).format("DD/MM/YYYY")),
                    datasets: [{
                        label: '#',
                        data: response.results.map((v: any) => Number(v.metric_0.raw)),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
            setBarChartConfig(chartConfig)
        }
    })

    useEffect(() => {
        mutation.mutateAsync(buildEsPayload())
    }, [])
    

    return (
        <div className="h-full">
            <ChartJs
                config={barChartConfig}/>
        </div>
    )
}

export default memo(MetricChartContainer)