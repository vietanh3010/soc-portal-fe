import {
    Card, CardContent, CardHeader,
    CardTitle
} from "@/components/ui/card"
import { memo } from "react"
import MetricChartContainer from "./charts/MetricChartContainer"
import MetricsForms from "./form-components/MetricsForms"
  
const Metrics = (): JSX.Element => {
    

    return (
        <section className="h-full w-full grid grid-cols-1 gap-5 " style={{gridAutoRows: "1fr"}}>
            <Card className="overflow-auto h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Chart</CardTitle>
                </CardHeader>
                <CardContent className="grow">
                    <MetricChartContainer/>
                </CardContent>
            </Card>

            <Card className="overflow-auto h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Metric explorer</CardTitle>
                </CardHeader>
                <CardContent className="grow overflow-auto">
                    <MetricsForms/>
                </CardContent>
            </Card>
        </section>
    )
}

export default memo(Metrics)