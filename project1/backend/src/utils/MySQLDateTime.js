export function MySQLDateTime(day) {
    return day.slice(0, 19).replace("T", " ");
}