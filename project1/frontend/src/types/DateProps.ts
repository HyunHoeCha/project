export type DateProps = {
    year: number;
    month: number;
    date: string | null;
    selectedDate: (dateStr: string) => void;
}