import { useState } from "react";
import axios from "axios";

function Filter({onSort}) {
    const [sortOrder, setSortOrder] = useState('');
    async function handleSortOrderChange(e) {
        
        try {
            if(e.target.value === "") {
                return
            }
            setSortOrder(e.target.value);
            const token = sessionStorage.getItem('token');
            const field = e.target.value.split('.');
            const res = await axios.get(`http://localhost:8080/products?sort=${field[0]}&order=${field[1]}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            onSort(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
        <div className="ml-3">
        <label htmlFor="price-sort" >Sort-</label>
            <select id="price-sort" name="price-sort" value={sortOrder} onChange={handleSortOrderChange} className="bg-white">
                <option value="">Please choose an option</option>
                <option value="price.asc">Price: Low to High</option>
                <option value="price.desc">Price: High to Low</option>
            </select>
        </div>
            
        </>
    )
}

export default Filter;