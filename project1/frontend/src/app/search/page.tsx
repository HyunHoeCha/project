"use client"
import styles from "./page.module.css"
import {useRouter} from "next/navigation";
import {useState} from "react";

function buildId(first: string, second: string) {
    if (
        first.length !== 8 ||
        second.length !== 3
    ) return;

    return `${first}-${second}`;
}

export default function Search() {
    const router = useRouter();

    const [reservationFirst, setReservationFirst] = useState<string>("");
    const [reservationSecond, setReservationSeconds] = useState<string>("");
    const [name, setName] = useState<string>("")
    const [status, setStatus] = useState<string>("");

    function handleSearch() {
        const params = new URLSearchParams();
        const id = buildId(reservationFirst, reservationSecond);

        if (id) params.set("id", id);
        if (name) params.set("name", name);
        if (status) params.set("status", status);

        router.push(`/reservations?${params.toString()}`);
    }

    return (
        <div className={styles.form}>
            <label>예약번호</label>
            <div className={styles.div}>
                <input
                    className={styles.input}
                    type={"text"}
                    inputMode={"numeric"}
                    maxLength={8}
                    value={reservationFirst}
                    placeholder={"예약번호 앞 8자리"}
                    onChange={(e) => setReservationFirst(e.target.value.replace(/\D/g, ""))}
                    />
                -
                <input
                    className={styles.input}
                    type={"text"}
                    inputMode={"numeric"}
                    maxLength={3}
                    value={reservationSecond}
                    placeholder={"예약번호 뒤 3자리"}
                    onChange={(e) => setReservationSeconds(e.target.value.replace(/\D/g, ""))}
                />
            </div>
            <label>예약자 성함</label>
            <input
                className={styles.input}
                type={"text"}
                value={name}
                placeholder={"성함을 입력해주세요."}
                onChange={e => setName(e.target.value)}
            />
            <label>상태</label>
            <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option className={styles.opt} value={""}>선택 없음</option>
                <option className={styles.opt} value={"STANDBY"}>대기</option>
                <option className={styles.opt} value={"CONFIRMED"}>확인</option>
                <option className={styles.opt} value={"COMPLETED"}>완료</option>
                <option className={styles.opt} value={"CANCELLED"}>취소</option>
            </select>

            <button className={styles.btn} onClick={handleSearch}>
                조회
            </button>
        </div>
    )
}