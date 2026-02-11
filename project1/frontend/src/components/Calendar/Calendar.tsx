"use client"
import styles from "@/app/reserve/page.module.css"
import { useState } from "react"
import {CalendarHeader} from "./CalendarHeader";
import {CalendarGrid} from "./CalendarGrid";

type Props = {
    value: string | null;
    onChange: (v: string | null) => void;
}

export default function Calendar({value, onChange}: Props) {
    const today = new Date();
    const nowYear = today.getFullYear();
    const nowMonth = today.getMonth() + 1;

    const [currentYM, setCurrentYM] = useState({year: nowYear, month: nowMonth});

    return (
        <section className={styles.section}>
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
                date={value}
                selectedDate={(dateStr) => onChange(dateStr)}
            />
        </section>
    )
}