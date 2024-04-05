import { ChartConfiguration } from "chart.js";
import { memo, useEffect, useState } from "react"
import Chart from 'chart.js/auto';
type ChartJsProps = React.HTMLAttributes<HTMLCanvasElement> & {
    config?: ChartConfiguration,
    isLoading?: boolean,
}
const ChartJs = ({
    config,
    isLoading,
    ...props
}: ChartJsProps): JSX.Element => {
    const [refCanvas, setRefCanvas] = useState<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if(!refCanvas || !config) return;
        const chart = new Chart(refCanvas, config);

        return () => {
            chart.destroy();
        }
    }, [config, refCanvas])
    
    return (
        <canvas 
            ref={r => setRefCanvas(r)}
            {...props}>
        </canvas>
    )
}

export default memo(ChartJs)