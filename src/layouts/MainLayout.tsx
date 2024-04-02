import { memo } from "react"

type MainLayoutsProps = {
    children: React.ReactNode,
}
const MainLayout = ({
    children
}: MainLayoutsProps): JSX.Element => {

    return (
        <section className="p-5">
            {children}
        </section>
    )
}

export default memo(MainLayout)