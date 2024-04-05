import { memo } from "react"

type MainLayoutsProps = {
    children: React.ReactNode,
}
const MainLayout = ({
    children
}: MainLayoutsProps): JSX.Element => {

    return (
        <div className="z-10 fixed inset-0 h-full w-full flex p-5 bg-slate-100">
            {children}
        </div>
    )
}

export default memo(MainLayout)