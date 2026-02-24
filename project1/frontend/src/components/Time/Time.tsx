import {SelectButton} from "@/components/Button/SelectButton";

type Props = {
    value: string | null;
    onChange: (v: string | null) => void;
}

type Option = string;

export default function Time({value, onChange}: Props) {
    const start = "09:00";
    const end = "18:00";
    const slot: Option[] = buildTimeSlots(start, end, 30);

    return (
        <div>
            {slot.map((opt) => (
                <SelectButton
                    key={opt}
                    option={opt}
                    selected={value === opt}
                    onSelect={() => onChange(opt)}
                />
            ))}
        </div>
    )
}

// 시작시간과 마감 1시간, value : 1시간 혹은 30분, 15분 단위로 배열 생성
function buildTimeSlots(start: string, end: string, value:number): string[] {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const slots: string[] = [];

    let startPoint = startHour * 60 + startMinute;
    let endPoint = endHour * 60 + endMinute;

    // 끝나는 마지막 시간보다 시작시간이 작아야 함.
    while(startPoint < endPoint) {
        const h = String(Math.floor(startPoint / 60)).padStart(2, "0");
        const m = String(startPoint % 60).padStart(2, "0");

        slots.push(`${h}:${m}`);
        startPoint += value;
    }
    return slots;
}