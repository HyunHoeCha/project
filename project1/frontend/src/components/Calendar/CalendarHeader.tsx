// 월 이동
import {YearMonthProps} from "@/types/YearMonthProps"

export function CalendarHeader({year, month, onPrevMonth, onNextMonth}: YearMonthProps) {
    return (
        <div>
            <button type={"button"} onClick={onPrevMonth}>◀</button>
            <span>{year}년 {month}월</span>
            <button type={"button"} onClick={onNextMonth}>▶</button>
        </div>
    )
}