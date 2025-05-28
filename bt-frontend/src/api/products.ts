import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = '/products';

export const fetchProducts = async (params?: Record<string, any>) => {
    const res = await axios.get<Product[]>(API_URL, { params });
    return res.data;
}

export const createProduct = async (product: Omit<Product, 'id'>) => {
    const res = await axios.post<Product>(API_URL, product);
    return res.data;
}

export const  updateProduct = async (id: number, product: Partial<Product>)=> {
    const res = await axios.put<Product>(`${API_URL}/${id}`, product);
    return res.data
}

export const deleteProduct = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
}

export const markOutOfStock = async (id: number) => {
    const res = await axios.post<Product>(`${API_URL}/${id}/outofstock`);
    return res.data
}

export const markInStock = async (id: number)=> {
    const res = await axios.put<Product>(`${API_URL}/${id}/instock`);
    return res.data
}