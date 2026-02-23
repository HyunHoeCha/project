import {DateProps} from "@/types/DateProps"
import styles from "@/app/reserve/page.module.css"
import {DayCell} from "./DayCell";

// 날짜를 보여주는 그리드 화면
// 캘린더 헤드에서의 년도와 월을 매개변수로 받아서 처리.
function bulidGrid(year: number, month: number): (number | null)[] {
    // 해당 월의 1일 찾기 JS에서는 월이 0부터 시작
    // 따라서 1월 = 0, 12월 = 11 현재 월로 보기 위해선 -1을 진행해야 한다.
    // 뒤의 1은 해당 월의 1일을 가리킨다.
    // 0, 1, 2, 3, 4, 5, 6
    const firstDay = new Date(year, month - 1, 1);

    // 해당 월의 마지막 일자 찾기
    // JS에서는 월이 0부터 시작
    // 해당 변수의 월은 실제 month + 1인 상태이다.
    // 뒤의 0은 직전 월의 마지막 날인 0일 즉, 지난 달의 마지막 일자를 가리킨다.
    // 따라서 month + 1인 월의 지난 달 마지막 일자를 뜻한다.
    const lastDate = new Date(year, month, 0).getDate();
    // 다른 방식으로는
    // const lastDate = new Date(year, month, 1)에서 하루 빼기를 진행한다.
    // lastDate.setDate(lastDate.getDate() - 1);
    // 해당 방식은 해당 변수의 month + 1인 월의 1일인 상황에서 -1을 하여
    // 실제 month의 마지막 날짜를 구하는 방식이 된다.

    const startWeek = firstDay.getDay(); // 0:"일", 1:"월", 2:"화", 3:"수",...
    // 해당 날이 들어가는 배열
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

// 그리드 화면 내부
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