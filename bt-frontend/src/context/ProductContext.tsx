import React, { createContext, useContext, useState, useEffect} from "react";
import { Product } from '../types/Product';
import * as api from '../api/products';

type ProductContextType = {
    products: Product[];
    refresh: () => Promise<void>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const refresh = async () =>{
        const data = await api.fetchProducts();
        setProducts(data);
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <ProductContext.Provider value = {{ products, setProducts, refresh }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error('useProducts must be used within Provider')
    return ctx;
};