"use client"
import styles from "./Calender.module.css"
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
                {/*캘린더 헤더
                    ex)  < 2026-02 >
                */}
                <CalendarHeader
                    year={currentYM.year}
                    month={currentYM.month}
                    onPrevMonth={() => {
                        setCurrentYM((prev) => {
                            // 1월인 경우 년도에서 -1을 하고 12월로 변경
                            if (prev.month === 1) {
                                return {year: prev.year - 1, month: 12};
                            }
                            return {year: prev.year, month: prev.month - 1};
                        });
                    }}
                    onNextMonth={() => {
                        setCurrentYM((prev) => {
                            // 12월인 경우 년도에서 +1을 하고 1월로 변경
                            if (prev.month === 12) {
                                return {year: prev.year + 1, month: 1};
                            }
                            return {year: prev.year, month: prev.month + 1};
                        });
                    }}
                />
            </div>


            <CalendarGrid
                // 캘린더 그리드화면 부분에 표시할 년도와 월을 넘겨서 그리드 만들기
                year={currentYM.year}
                month={currentYM.month}
                date={value}
                selectedDate={(dateStr) => onChange(dateStr)}
            />
        </section>
    )
}