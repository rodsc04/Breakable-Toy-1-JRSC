import React, { useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { ProductProvider, useProducts } from "./context/ProductContext";
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import SearchBar from "./components/SearchBar";
import MetricsPanel from "./components/MetricsPanel";
import PaginationControl from "./components/PaginationControl";
import * as api from "./api/products";
import { Product } from "./types/Product";

const PAGE_SIZE = 10;

const Main = () => {
  const { products, refresh } = useProducts();
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined);
  const [filter, setFilter] = useState({ name: "", category: "", availability: "all" });
  const [page, setPage] = useState(1);

  // Filtering
  const filtered = products.filter(p =>
      (!filter.name || p.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (!filter.category || p.category === filter.category) &&
      (filter.availability === "all" ||
          (filter.availability === "in" && p.quantity > 0) ||
          (filter.availability === "out" && p.quantity === 0))
  );
  const categories = Array.from(new Set(products.map(p => p.category)));

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  const handleSave = async (prod: Omit<Product, "id">) => {
    if (editProduct) await api.updateProduct(editProduct.id, prod);
    else await api.createProduct(prod);
    setEditProduct(undefined);
    await refresh();
  };

  const handleEdit = (prod: Product) => {
    setEditProduct(prod);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await api.deleteProduct(id);
    await refresh();
  };

  const handleStockToggle = async (prod: Product, checked: boolean) => {
    if (checked) await api.markOutOfStock(prod.id);
    else await api.markInStock(prod.id);
    await refresh();
  };

  return (
      <Container maxWidth="md">
        <Typography variant="h4" align="center" mt={4} mb={2}>Product Inventory</Typography>
        <SearchBar onSearch={params => { setFilter(params); setPage(1); }} categories={categories} />
        <Button variant="contained" onClick={() => { setEditProduct(undefined); setOpen(true); }} sx={{ mb: 2 }}>
          New Product
        </Button>
        <ProductTable
            products={paginated}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStockToggle={handleStockToggle}
        />
        <PaginationControl page={page} pageCount={pageCount} onChange={(_, value) => setPage(value)} />
        <MetricsPanel products={products} />
        <ProductModal
            open={open}
            onClose={() => setOpen(false)}
            onSave={handleSave}
            categories={categories}
            initial={editProduct}
        />
      </Container>
  );
};

const App = () => (
    <ProductProvider>
      <Main />
    </ProductProvider>
);

export default App;