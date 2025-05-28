import dayjs from "dayjs";
import { Product } from "../types/Product";

export function getExpirationColor(expirationDate: string | null): string | undefined {
    if (!expirationDate) return undefined;
    const now = dayjs();
    const exp = dayjs(expirationDate);
    const diff = exp.diff(now, "day");
    if (diff < 7) return "#ffcccc"; // red
    if (diff < 14) return "#fff7b2"; //yellow
    return "#c8f7c5"; // green
}

export function getStockColor(quantity: number): string | undefined {
    if (quantity == 0) return undefined;
    if (quantity < 5) return "#ffcccc"; // red
    if (quantity <= 10) return "#fbd89f"; // orange
    return undefined;
}