export function KSTConversion(timestamp: string) {
    const date = new Date(timestamp);
    date.setHours(date.getHours() + 9);
    return date.toISOString().slice(0, 16).replace("T", " ");
}