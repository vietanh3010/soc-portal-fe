import ChartJs from "@/custom-components/charts/ChartJs";
import useMetricsStore from "@/zustand/metrics.slice";
import { ChartConfiguration } from "chart.js";
import dayjs from "dayjs";
import _ from "lodash";
import { memo, useEffect, useState } from "react";


const MetricChartContainer = (): JSX.Element => {
    const [chartConfig, setChartConfig] = useState<any>(undefined);
    const { requestResults } = useMetricsStore();
   

    useEffect(() => {
        if(!requestResults) return;
        const aggData = requestResults.aggregations.timestamp.buckets;
        const fieldsList = Object.keys(_.omit(aggData[0], "key", "doc_count"))
        const data = {
            labels: aggData.map(v => dayjs(Number(v.key)).format("DD/MM/YYYY")),
            datasets: fieldsList.map(field => ({
                label: `${field}`,
                data: aggData.map(d => _.get(d, field)?.value ?? 0),
            }))
        }
        const chartConfig: ChartConfiguration = {
            type: 'line',
            data: data as any,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                    display: true,
                    text: 'Line chart'
                    }
                }
            },
          };
          setChartConfig(chartConfig)
    }, [requestResults])
    

    return (
        <div className="h-full">
            <ChartJs
                config={chartConfig}/>
        </div>
    )
}

export default memo(MetricChartContainer)