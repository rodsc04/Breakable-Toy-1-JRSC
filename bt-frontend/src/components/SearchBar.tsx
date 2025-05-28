import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

type Props = {
    onSearch: (params: {name: string; category: string; availability: string}) => void;
    categories: string[];
};

const availabilityOptions = [
    { value: "all", label: "All"},
    { value: "in", label: "In stock"},
    { value: "out", label: "Out of stock"}
];

const SearchBar: React.FC<Props> = ({ onSearch, categories }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [availability, setAvailability] = useState("all");

    return (
        <Box display="flex" gap={2} alignItems="center" mb={2}>
            <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                size="small"
            />
            <TextField
                label="Category"
                select
                value={category}
                onChange={e => setCategory(e.target.value)}
                size="small"
                style={{ minWidth: 150 }}
            >
                <MenuItem value="">All</MenuItem>
                {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
            <TextField
                label="Availability"
                select
                value={availability}
                onChange={e => setAvailability(e.target.value)}
                size="small"
                style={{ minWidth: 150 }}
            >
                {availabilityOptions.map(opt =>
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                )}
            </TextField>
            <Button variant="contained" onClick={() => onSearch({ name, category, availability })}>
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;