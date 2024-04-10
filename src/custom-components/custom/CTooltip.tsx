import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { memo } from "react"

type CTooltipProps = {
    children: React.ReactNode,
    title: React.ReactNode,
}
const CTooltip = ({
    children,
    title,
}: CTooltipProps): JSX.Element => {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className="duration-[50ms]">
                    {title}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default memo(CTooltip)