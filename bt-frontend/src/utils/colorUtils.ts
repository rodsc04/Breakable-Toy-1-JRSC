import dayjs from "dayjs";

export function getStockColor(quantity: number): string | undefined {
    if (quantity >= 0 && quantity <= 5) return "#ffcccc";   // Red
    if (quantity >= 6 && quantity <= 10) return "#fbd89f";  // Orange
    if (quantity > 10) return "#c8f7c5";                    // Green
    return undefined;
}

export function getExpirationColor(expirationDate: string | null): string | undefined {
    if (!expirationDate) return undefined; // No color for no date
    const now = dayjs().startOf("day");
    const exp = dayjs(expirationDate).startOf("day");
    const diff = exp.diff(now, "day");
    if (diff <= 7) return "#ffcccc";      // red
    if (diff <= 14) return "#fff7b2";     // yellow
    if (diff > 14) return "#c8f7c5";      // green
    return undefined;
}