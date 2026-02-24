import {SelectButton} from "@/components/Button/SelectButton";

type Props = {
    value: string | null;
    onChange: (v: string | null) => void;
}

// 회의실1 버튼을 눌르면
// 나머지 버튼은 비활성화
type Option = string;

export default function Location({value, onChange}: Props) {
    const option: Option[] = ["ROOM1", "ROOM2", "ROOM3", "ROOM4"];

    return (
        <div>
            {option.map((opt) => (
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