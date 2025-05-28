import React from "react";
import { Product } from "../types/Product";
import { Box, Typography, Table, TableBody, TableRow, TableCell, TableHead } from "@mui/material";

function getMetrics(products: Product[]) {
    const categories = Array.from(new Set(products.map(p => p.category)));
    const overall = { stock: 0, value: 0, avg: 0 };
    const perCategory = categories.map(cat => {
        const items = products.filter(p => p.category === cat && p.quantity > 0);
        const stock = items.reduce((a, p) => a + p.quantity, 0);
        const value = items.reduce((a, p) => a + p.quantity * p.price, 0);
        const avg = items.length > 0 ? value / stock : 0;
        overall.stock += stock;
        overall.value += value;
        return { cat, stock, value, avg: avg || 0 };
    });
    overall.avg = overall.stock > 0 ? overall.value / overall.stock : 0;
    return { perCategory, overall };
}

const MetricsPanel: React.FC<{ products: Product[] }> = ({ products }) => {
    const { perCategory, overall } = getMetrics(products);

    return (
        <Box mt={4}>
            <Typography variant="h6">Inventory Metrics</Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Total products in Stock</TableCell>
                        <TableCell>Total Value in Stock</TableCell>
                        <TableCell>Average price in Stock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {perCategory.map(row => (
                        <TableRow key={row.cat}>
                            <TableCell>{row.cat}</TableCell>
                            <TableCell>{row.stock}</TableCell>
                            <TableCell>${row.value.toFixed(2)}</TableCell>
                            <TableCell>${row.avg.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell><b>Overall</b></TableCell>
                        <TableCell>{overall.stock}</TableCell>
                        <TableCell>${overall.value.toFixed(2)}</TableCell>
                        <TableCell>${overall.avg.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default MetricsPanel;