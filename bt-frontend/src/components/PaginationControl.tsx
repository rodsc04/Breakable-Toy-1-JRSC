import React from "react";
import { Pagination, Box } from "@mui/material";

type Props = {
    page: number;
    pageCount: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const PaginationControl: React.FC<Props> = ({ page, pageCount, onChange }) => (
    <Box display="flex" justifyContent="center" my={2}>
        <Pagination count={pageCount} page={page} onChange={onChange}/>
    </Box>
);

export default PaginationControl