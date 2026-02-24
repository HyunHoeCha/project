"use client"
import {useRouter} from "next/navigation";
import {Reservation} from "@/types/Data"
import styles from "./RemoveClient.module.css"
import DeleteReservation from "@/components/DeleteReservation/DeleteReservation"
import {KSTConversion} from "@/utils/KSTConversion";

type Props = {
    result: Reservation;
}

export default function RemoveClient({result} : Props) {
    const router = useRouter();

    return (
        <div className={styles.backdrop}>
            <form action={DeleteReservation} className={styles.content}>
                    <ul className={styles.list}>
                        <li>예약 번호 : {result.reserveId}</li>
                        <li>예약자 성함 : {result.name}</li>
                        <li>예약 시작일 : {KSTConversion(result.startAt)}</li>
                    </ul>

                <input
                    type={"hidden"}
                    name={"id"}
                    value={result.id} />

                <button
                    type={"button"}
                    className={styles.btn}
                    onClick={() => router.back()}
                    >
                    취소
                </button>

                <button type="submit">
                    삭제
                </button>
            </form>
        </div>
    )
}