import "./page.module.css"

type Props = {
    children: React.ReactNode,
    modal: React.ReactNode;
}

export default function Layout({children, modal}: Props) {
    return (
        <>
            {/*본문 레이어*/}
            <div>
                {children}
            </div>

            {/*모달 레이어*/}
            {modal}
        </>
    )
}