import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "../types/Product";
import { getExpirationColor, getStockColor } from "../utils/colorUtils";

type SortKey = "name" | "category" | "price" | "quantity" | "expirationDate" | "";

type Props = {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
    onStockToggle: (product: Product, checked: boolean) => void;
    sortBy: SortKey;
    sortOrder: "asc" | "desc";
    onSort: (key: SortKey) => void;
};

const ProductTable: React.FC<Props> = ({
                                           products,
                                           onEdit,
                                           onDelete,
                                           onStockToggle,
                                           sortBy,
                                           sortOrder,
                                           onSort,
                                       }) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "category"}
                                direction={sortBy === "category" ? sortOrder : "asc"}
                                onClick={() => onSort("category")}
                            >
                                Category
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "name"}
                                direction={sortBy === "name" ? sortOrder : "asc"}
                                onClick={() => onSort("name")}
                            >
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "price"}
                                direction={sortBy === "price" ? sortOrder : "asc"}
                                onClick={() => onSort("price")}
                            >
                                Price
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "expirationDate"}
                                direction={sortBy === "expirationDate" ? sortOrder : "asc"}
                                onClick={() => onSort("expirationDate")}
                            >
                                Expiration Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "quantity"}
                                direction={sortBy === "quantity" ? sortOrder : "asc"}
                                onClick={() => onSort("quantity")}
                            >
                                Stock
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((prod) => {
                        const rowBg = getExpirationColor(prod.expirationDate);
                        const stockColor = getStockColor(prod.quantity);
                        return (
                            <TableRow
                                key={prod.id}
                                style={{
                                    backgroundColor: rowBg,
                                    textDecoration: prod.quantity === 0 ? "line-through" : undefined,
                                }}
                            >
                                <TableCell>
                                    <Checkbox
                                        checked={prod.quantity === 0}
                                        onChange={(e) => onStockToggle(prod, e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell>{prod.category}</TableCell>
                                <TableCell>{prod.name}</TableCell>
                                <TableCell>${prod.price.toFixed(2)}</TableCell>
                                <TableCell>
                                    {prod.expirationDate
                                        ? new Date(prod.expirationDate).toLocaleDateString()
                                        : ""}
                                </TableCell>
                                <TableCell style={{ backgroundColor: stockColor }}>
                                    {prod.quantity}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => onEdit(prod)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => onDelete(prod.id)}>
                                        <DeleteIcon />
                                    </IconButton>
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