type DayCellProps = {
    day: number | null;
    isSelected: boolean;
    isDisabled: boolean;
    onClick: () => void;
}


export function DayCell(props: DayCellProps) {
    if (props.day === null) {
        return <div className={"cell empty"} />;
    }

    return (
        <button
            type={"button"}
            className={`cell ${props.isSelected ? 'selected' : ''}`}
            disabled={props.isDisabled}
            onClick={props.onClick}
        >
            {props.day}
        </button>
    )
}