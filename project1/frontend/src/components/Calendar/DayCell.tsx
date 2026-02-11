type DayCellProps = {
    day: number | null;
    isSelected: boolean;
    isDisabled: boolean;
    onClick: () => void;
}
import styles from "@/app/reserve/page.module.css"


export function DayCell(props: DayCellProps) {
    if (props.day === null) {
        return <div className={"cell empty"} />;
    }

    return (
        <button
            type={"button"}
            className={props.isSelected ? styles.selected : ''}
            disabled={props.isDisabled}
            onClick={props.onClick}
        >
            {props.day}
        </button>
    )
}