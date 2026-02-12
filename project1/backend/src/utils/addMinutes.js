export function addMinutes(date, m) {
    return new Date(date.getTime() + m * 60 * 1000);
}