export function nextId(data) {
    const maxId = data.reduce((max, i) => Math.max(max, i), 0);
    return maxId + 1;
}

export function reserveId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const value = Math.floor(Math.random()*1001);

    return `${year}${month}${day}-${value}`;
}

