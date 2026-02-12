export function KSTConversion(timestamp) {
    const date = new Date(timestamp.getTime() + 9 * 60 * 60 * 1000);
    return date;
}