import {DateProps} from "@/types/DateProps"
import styles from "@/app/reserve/page.module.css"
import {DayCell} from "./DayCell";

// 날짜를 보여주는 그리드 화면
function bulidGrid(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month - 1, 1); // 해당 월의 1일 찾기
    const lastDate = new Date(year, month, 0).getDate(); // 해당 월의 마지막 일자 찾기

    const startWeek = firstDay.getDay(); // 0:"일", 1:"월", 2:"화", 3:"수",...
    const cells: (number | null)[] = [];

    // 앞쪽 빈칸 만들기
    for (let i = 0; i < startWeek; i++) {cells.push(null);}

    // 날짜 채우기 ( 1 ~ 마지막날 )
    for (let date = 1; date <= lastDate; date++) {cells.push(date)}

    // 뒤쪽 빈칸 만들기
    // 일주일의 배수로 맞추기
    while (cells.length % 7 !== 0) {cells.push(null);}

    return cells;
}

export function CalendarGrid(props: DateProps) {
    const {year, month, date, selectedDate} = props;
    const cells = bulidGrid(year, month);

    return (
        <div className={styles.calendar}>
            <div className={"week"}>일</div>
            <div className={"week"}>월</div>
            <div className={"week"}>화</div>
            <div className={"week"}>수</div>
            <div className={"week"}>목</div>
            <div className={"week"}>금</div>
            <div className={"week"}>토</div>

            {cells.map((d, i) => {
                if (d === null) return (
                    <DayCell
                        key={i}
                        day={null}
                        isSelected={false}
                        isDisabled={true}
                        onClick={() => {}}
                        />
                    );

                const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                const isSelected = date === dateStr;

                return (
                    <DayCell
                        key={i}
                        day={d}
                        isSelected={isSelected}
                        isDisabled={false}
                        onClick={() => selectedDate(dateStr)}
                    />
                )
                }
            )}
        </div>
    )
}