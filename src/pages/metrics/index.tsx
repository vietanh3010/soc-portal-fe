import {
    Card, CardContent, CardHeader
} from "@/components/ui/card"
import { memo } from "react"
import MetricsForms from "./form-components/MetricsForms"
  
const Metrics = (): JSX.Element => {
    

    return (
        <Card>
            <CardHeader></CardHeader>
            <CardContent>
                <MetricsForms/>
            </CardContent>
        </Card>
    )
}

export default memo(Metrics)