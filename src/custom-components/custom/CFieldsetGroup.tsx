import clsx from "clsx"
import { memo } from "react"

type CFieldsetGroupProps =  Pick<React.HTMLAttributes<HTMLFieldSetElement>, "className"> & {
    title?: React.ReactNode,
    children?: React.ReactNode,
}
const CFieldsetGroup = ({
    className,
    title,
    children
}: CFieldsetGroupProps): JSX.Element => {


    return (
        <fieldset className={clsx("rounded-lg border p-4 w-fit", className)}>
            <legend className="-ml-1 px-1 text-sm font-medium">{title}</legend>
            {children}
        </fieldset>
    )
}

export default memo(CFieldsetGroup)