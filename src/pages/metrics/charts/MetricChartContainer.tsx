import ChartJs from "@/custom-components/charts/ChartJs";
import { ChartHelper } from "@/helpers/chart.helper";
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
            datasets: fieldsList.map((field, i) => {
                const color = ChartHelper.palette[i];
                const {r,g,b} = ChartHelper.hexToRgb(color);
                return {
                    label: `${field}`,
                    borderColor: color,
                    backgroundColor: `rgba(${r},${g},${b}, 0.7)`,
                    data: aggData.map(d => _.get(d, field)?.value ?? 0),
                }
            })
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
                scales: {
                    x: {
                        grid: {
                            color: "#f3f4f6"
                        }
                    },
                    y: {
                        grid: {
                            color: "#f3f4f6"
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Metric chart'
                    },
                },
            },
            plugins: [
                {
                    id: "hoverdraw",
                    afterDraw: (chart: any) => {
                        if (chart.tooltip?._active?.length) {               
                           const x = chart.tooltip._active[0].element.x;             
                           const yAxis = chart.scales.y;
                           const ctx = chart.ctx;
                           ctx.save();
                           ctx.beginPath();
                           ctx.moveTo(x, yAxis.top);
                           ctx.lineTo(x, yAxis.bottom);
                           ctx.lineWidth = 1;
                           ctx.setLineDash([3, 3]);
                           ctx.strokeStyle = '#6b7280';
                           ctx.stroke();
                           ctx.restore();
                        }
                      }
                }
            ]
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