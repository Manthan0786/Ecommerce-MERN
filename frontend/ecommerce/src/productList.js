import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    async function fetchdata() {
        try {
            const res = await axios.get('http://localhost:8080/products/');
            const data = res.data;
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, [])

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:8080/products/${id}`)
        if (res.data._id) {
            setProducts(products.filter(p => p._id !== res.data._id))
        }
    }

    const handleClick = () => {
        navigate('/add');
    }

    return (
        <React.Fragment>
            <div className='z-10 w-full h-10 bg-gray text-center sticky top-0 left-0 right-0 opacity-100
            italic text-2xl font-semibold text-amber'>Products</div>
            <div className='grid grid-cols-3 px-4 mt-4 gap-4 mb-4'>
                {
                    products && products.map(p => {
                        return (
                            <div className='w-auto bg-white rounded-md shadow-md overflow-hidden basis-1/4
                       transform hover:scale-105 transition duration-300 static' key={p._id} >
                                <img src={p.thumbnail} alt='product pic' className='w-full h-48 object-fit' />
                                <div className="px-4 py-2">
                                    <div className='flex justify-between'>
                                        <h2 className="text-gray-800 text-lg font-bold mb-2">{p.title}</h2>
                                        <span className='new-price'>${p.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-snug">{p.description}</p>
                                </div>
                                <div className="px-4 py-2 bg-gray-100 ">
                                    <span className="rating-number">{p.rating}</span>
                                </div>
                                <button className='bg-cyan-500 hover:bg-cyan-600 rounded-full absolute bottom-0 right-0' onClick={() => handleDelete(p._id)}>
                                    <DeleteIcon></DeleteIcon>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='fixed bottom-2 right-4'>
                <Button variant="contained" onClick={handleClick}>
                    <Add />
                </Button>
            </div>
        </React.Fragment>
    )
}

export default Product;