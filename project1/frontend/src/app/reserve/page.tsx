"use client"
import styles from "../page.module.css"
import { useState } from "react"
import {CalendarHeader} from "@/components/reservation/CalendarHeader";
import {CalendarGrid} from "@/components/reservation/CalendarGrid";

export default function ReservePage() {
    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth() + 1;

    const [currentYM, setCurrentYM] = useState({year: nowYear, month: nowMonth});
    const [date, setDate] = useState<string | null>(null);

    return (
        <section className={styles.section}>
            <form className={styles.form}>
                <div style={{textAlign: "center"}}>
                    <h3>날짜</h3>
                    <CalendarHeader
                        year={currentYM.year}
                        month={currentYM.month}
                        onPrevMonth={() => {
                            setCurrentYM((prev) => {
                                if (prev.month === 1) {
                                    return {year: prev.year - 1, month: 12};
                                }
                                return {year: prev.year, month: prev.month - 1};
                            });
                        }}
                        onNextMonth={() => {
                            setCurrentYM((prev) => {
                                if (prev.month === 12) {
                                    return {year: prev.year + 1, month: 1};
                                }
                                return {year: prev.year, month: prev.month + 1};
                            });
                        }}
                    />
                </div>

                <CalendarGrid
                    year={currentYM.year}
                    month={currentYM.month}
                    date={date}
                    selectedDate={(dateStr) => setDate(dateStr)}
                />

                <></>

                <button>등록</button>
            </form>
        </section>
    )
}