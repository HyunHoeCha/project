"use client"
import styles from "./page.module.css"
import {useState, useEffect} from "react";
import {Reservation} from "@/types/Data";
import {getAll} from "@/app/api/route";
import {KSTConversion} from "@/utils/KSTConversion";

export default function List() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getAll();
                setReservations(result.data || []);
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchData();
    }, [])

    if (error) return <div>Error: {error}</div>

    console.log(reservations);

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
                        <th className={styles.th}>종료 시간</th>
                        <th className={styles.th}>상 태</th>
                        <th className={styles.th}>상세보기</th>
                        <th className={styles.th}>삭제</th>
                    </tr>
                </thead>
                <tbody>
                {reservations.map((v) => (
                    <tr key={v.id} className={styles.tr}>
                        <td className={styles.td}>{v.id}</td>
                        <td className={styles.td}>{v.name}</td>
                        <td className={styles.td}>{v.reserveId}</td>
                        <td className={styles.td}>{KSTConversion(v.startAt)}</td>
                        <td className={styles.td}>{KSTConversion(v.endAt)}</td>
                        <td className={styles.td}>{v.status}</td>
                        <td className={styles.td}><button type={"button"} className={styles.btn}>상세</button></td>
                        <td className={styles.td}><button type={"button"} className={styles.btn}>삭제</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}