"use client"

import { useRouter } from "next/navigation";
import styles from "../../../../hooks/RemoveClient/RemoveClient.module.css"

export default async function Modal({
    params,
    }: {
    params: Promise<{id:string}>
}) {
    const router = useRouter();
    const { id } = await params;

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h3>예약 상세{id}</h3>

                <button onClick={() => router.back()}>
                    X
                </button>
            </div>
        </div>
    )
}
