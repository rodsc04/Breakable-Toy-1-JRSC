import React from "react";
import { render } from "@testing-library/react";
import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";
import MetricsPanel from "../components/MetricsPanel";
import { Product } from "../types/Product";

const sampleProducts: Product[] = [
    { id: 1, name: "Apple", category: "Fruit", price: 1.5, expirationDate: "2025-07-01", quantity: 10 },
    { id: 2, name: "Banana", category: "Fruit", price: 1.0, expirationDate: "2025-06-01", quantity: 0 },
    { id: 3, name: "Carrot", category: "Vegetable", price: 0.5, expirationDate: "2025-06-15", quantity: 5 },
];

describe("ProductTable", () => {
    it("renders without crashing", () => {
        render(
            <ProductTable
                products={sampleProducts}
                onEdit={() => {}}
                onDelete={() => {}}
                onStockToggle={() => {}}
                sortBy=""
                sortOrder="asc"
                onSort={() => {}}
            />
        );
    });
});

describe("SearchBar", () => {
    it("renders without crashing", () => {
        render(
            <SearchBar
                onSearch={() => {}}
                categories={["Fruit", "Vegetable"]}
            />
        );
    });
});

describe("MetricsPanel", () => {
    it("renders without crashing", () => {
        render(
            <MetricsPanel products={sampleProducts} />
        );
    });
});