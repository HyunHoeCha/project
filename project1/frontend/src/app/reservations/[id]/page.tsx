"use client"

import {useState, useEffect} from "react";
import {Reservation, ParamsProps, State} from "@/types/Data";
import styles from "./page.module.css"

type Response = {
    data: Reservation;
}

export default function ReserveDetails({params}: ParamsProps) {
    const [status, setStatus] = useState<State>("IDLE");
    const [reservations, setReservations] = useState<Reservation>();

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            setStatus("LOADING");
            const { id } = await params;

            try {
                const res = await fetch(`/api/reservations/${id}`, {signal: controller.signal});
                if (!res.ok) throw new Error("Error Fetch");
                const result:Response = await res.json();

                setReservations(result.data ?? null);
                console.log("데이터: ", result);
                setStatus("SUCCESS");
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setStatus("ERROR");
            }
        })();

        return () => controller.abort();
    }, [params]);

    return (
        <>
            <div>
                <h3>상태</h3>
                {status === "LOADING" && <p>로딩 중</p>}
                {status === "ERROR" && <p>불러오기 실패</p>}
                {status === "SUCCESS" && <p>불러오기 성공</p>}
            </div>

            <h3>상세보기</h3>
              <ul key={reservations?.id} className={styles.item}>
                  <li>예약 번호 : {reservations?.reserveId}</li>
                  <li>이름 : {reservations?.name}</li>
                  <li>시작 시간 : {reservations?.startAt}</li>
                  <li>종료 시간 : {reservations?.endAt}</li>
                  <li>상태 : {reservations?.status}</li>
              </ul>
        </>
    )
}