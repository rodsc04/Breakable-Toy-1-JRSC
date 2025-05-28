import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../types/Product";
import { getExpirationColor, getStockColor } from "../utils/colorUtils";

type Props = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    onStockToggle: (product: Product, checked: boolean) => void;
};

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete, onStockToggle }) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Category</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Expiration Date</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map(prod => {
                        const rowBg = getExpirationColor(prod.expirationDate);
                        const stockColor = getStockColor(prod.quantity);
                        return (
                            <TableRow key={prod.id} style={{ backgroundColor: rowBg }}>
                                <TableCell>
                                    <Checkbox
                                        checked={prod.quantity === 0}
                                        onChange={e => onStockToggle(prod, !prod.quantity)}
                                    />
                                </TableCell>
                                <TableCell>{prod.category}</TableCell>
                                <TableCell>
                  <span style={{
                      textDecoration: prod.quantity === 0 ? "line-through" : undefined
                  }}>{prod.name}</span>
                                </TableCell>
                                <TableCell>${prod.price.toFixed(2)}</TableCell>
                                <TableCell>{prod.expirationDate ? new Date(prod.expirationDate).toLocaleDateString() : ""}</TableCell>
                                <TableCell style={{ backgroundColor: stockColor }}>
                                    {prod.quantity}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => onEdit(prod)}><EditIcon /></IconButton>
                                    <IconButton size="small" onClick={() => onDelete(prod.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductTable;