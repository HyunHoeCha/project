"use client"
import {useState} from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Calendar from "@/components/Calendar/Calendar";
import Location from "@/components/option/Location";
import Time from "@/components/Time/Time";


export default function page() {
    const [location, setLocation] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        // string으로 전달.
        console.log("선택된 값");
        console.log("location: ", location);
        console.log("date: ", date);
        console.log("time: ", time);
    }


    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Location value={location} onChange={setLocation} />
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Calendar value={date} onChange={setDate} />
                    <Time value={time} onChange={setTime} />
                </div>
                <button type={"reset"} className={styles.button}>새로 고침</button>

                <button type={"submit"} className={styles.button}>다음 단계</button>
            </form>
            <button type={"button"} className={styles.button}>
                <Link href={"/"}>돌아가기</Link>
            </button>
        </>
    )
}

