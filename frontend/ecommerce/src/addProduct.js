import { TextField, Button } from "@mui/material"
import { useState } from "react";
import axios from 'axios';

function AddProduct() {
    const [addProduct, setAddProduct] = useState({});

    const handleChange = (e) => {
        setAddProduct({ ...addProduct, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post("/products", addProduct);
        console.log(res.data);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 bg-clip-border px-64 pt-4 bg-slate">
                    <TextField required id="title" label="Title" type="text" variant="outlined" onChange={handleChange} />
                    <TextField id="description" label="Description" type="text" multiline maxRows={4} variant="outlined" onChange={handleChange} />
                    <TextField required id="price" label="Price" type="number" variant="outlined" onChange={handleChange} />
                    <TextField id="rating" label="Rating" type="number" variant="outlined" onChange={handleChange} />
                    <TextField required id="brand" label="Brand" type="text" variant="outlined" onChange={handleChange} />
                    <TextField required id="category" label="Category" type="text" variant="outlined" onChange={handleChange} />
                    <TextField id="thumbnail" label="Thumbnail" type="text" variant="outlined" onChange={handleChange} />
                </div>
                <div className="mt-4 flex justify-center">
                    <Button variant="contained" type="submit">Add Product</Button>
                </div>
            </form>

        </>
    )
}

export default AddProduct;
