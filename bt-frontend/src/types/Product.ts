export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    expirationDate: string | null; //null in case of no date
    quantity: number;
    createDate?: string;
    updateDate?: string;
}