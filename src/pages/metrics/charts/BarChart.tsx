import ChartJs from "@/custom-components/charts/ChartJs"
import { memo } from "react"


const BarChart = (): JSX.Element => {

    return (
        <ChartJs
            config={{
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
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
            }}/>
    )
}

export default memo(BarChart)