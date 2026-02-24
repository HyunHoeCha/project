import {ReservationsResponse} from "@/types/Data";
import styles from "./List.module.css";
import {KSTConversion} from "@/utils/KSTConversion";
import Link from "next/link";

export default function List({data}: ReservationsResponse) {
    return (
        <section style={{textAlign: "center"}}>
            <h3> 예약 목록 </h3>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.th}>no.</th>
                    <th className={styles.th}>이름</th>
                    <th className={styles.th}>예약 번호</th>
                    <th className={styles.th}>시작 시간</th>
                    <th className={styles.th}>상 태</th>
                    <th className={styles.th}>상세보기</th>
                    <th className={styles.th}>삭제</th>
                </tr>
                </thead>
                <tbody>
                {data.map((v) => (
                    <tr key={v.id} className={styles.tr}>
                        <td className={styles.td}>{v.id}</td>
                        <td className={styles.td}>{v.name}</td>
                        <td className={styles.td}>{v.reserveId}</td>
                        <td className={styles.td}>{KSTConversion(v.startAt)}</td>
                        <td className={styles.td}>{v.status}</td>
                        <td className={styles.td}>
                            <Link href={`/reservations/${v.id}`} className={styles.btn}>
                                상세보기
                            </Link>
                        </td>
                        <td className={styles.td}>
                            <Link href={`/reservations/${v.id}/remove`} className={styles.btn}>
                                삭제
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}