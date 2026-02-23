"use client"
import styles from "./page.module.css"
import {useState, useEffect} from "react";
import {Reservation, ReservationsResponse, State} from "@/types/Data";
import {KSTConversion} from "@/utils/KSTConversion";
import Link from "next/link";

export default function List() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [status, setStatus] = useState<State>("IDLE");

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            setStatus("LOADING");

            try {
                const res = await fetch("/api/reservations", {signal: controller.signal});

                console.log("응답: ", res);
                const result:ReservationsResponse = await res.json();

                console.log(result);
                setReservations(result.data ?? []);

                console.log(reservations);
                setStatus("SUCCESS");
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setStatus("ERROR");
            }
        })();
    }, [])

    return (
        <section style={{textAlign: "center"}}>
            <div>
                <h3>상태</h3>
                {status === "LOADING" && <p>로딩 중</p>}
                {status === "ERROR" && <p>불러오기 실패</p>}
                {status === "SUCCESS" && <p>불러오기 성공</p>}
            </div>

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
                {reservations.map((v) => (
                    <tr key={v.id} className={styles.tr}>
                        <td className={styles.td}>{v.id}</td>
                        <td className={styles.td}>{v.name}</td>
                        <td className={styles.td}>{v.reserveId}</td>
                        <td className={styles.td}>{KSTConversion(v.startAt)}</td>
                        <td className={styles.td}>{v.status}</td>
                        <td className={styles.td}>
                            <Link href={`/reservations/${v.id}`}>
                                <button type={"button"} className={styles.btn}>
                                    상세보기
                                </button>
                            </Link>
                        </td>
                        <td className={styles.td}><button type={"button"} className={styles.btn}>삭제</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    )
}