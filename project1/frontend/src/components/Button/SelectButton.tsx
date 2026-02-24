import {OptionProps} from "@/types/Option";
import styles from "./Button.module.css";

export function SelectButton({option, selected, onSelect}: OptionProps) {
    return (
        <>
            <button
                type={"button"}
                className={`${styles.button} ${selected? styles.selected: ""}`}
                onClick={onSelect}
            >
                {option}
            </button>
        </>
)
}