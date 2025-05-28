import React, { useState, useEffect } from "react";
import {Modal, Box, TextField, Button, MenuItem, Autocomplete} from "@mui/material";
import { Product } from "../types/Product";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (prod: Omit<Product, "id">) => void;
    categories: string[];
    initial?: Partial<Product>;
};

const style = {
    position: 'absolute' as const,
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    minWidth: 400,
};

const ProductModal: React.FC<Props> = ({ open, onClose, onSave, categories, initial }) => {
    const [name, setName] = useState(initial?.name || "");
    const [category, setCategory] = useState(initial?.category || "");
    const [quantity, setQuantity] = useState(initial?.quantity ?? 10);
    const [price, setPrice] = useState(initial?.price ?? 1);
    const [expirationDate, setExpirationDate] = useState(initial?.expirationDate || "");
    const [error, setError] = useState("");

    useEffect(() => {
        setName(initial?.name || "");
        setCategory(initial?.category || "");
        setQuantity(initial?.quantity ?? 10);
        setPrice(initial?.price ?? 1);
        setExpirationDate(initial?.expirationDate || "");
    }, [initial, open]);

    const handleSave = () => {
        if (!name || !category || price <= 0 || quantity < 0) {
            setError("Fill all fields correctly!");
            return;
        }
        onSave({ name, category, price, quantity, expirationDate: expirationDate || null });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Autocomplete
                    freeSolo
                    options={categories}
                    value={category}
                    onInputChange={(event, newInputValue) => setCategory(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Category"
                            required
                        />
                    )}
                />
                <TextField
                    label="Stock"
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    required
                />
                <TextField
                    label="Unit Price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    required
                />
                <TextField
                    label="Expiration Date"
                    type="date"
                    value={expirationDate ?? ""}
                    onChange={e => setExpirationDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                {error && <Box color="red">{error}</Box>}
                <Box display="flex" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProductModal;