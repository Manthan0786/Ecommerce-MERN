import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
// import DeleteIcon from '@mui/icons-material/Delete';
import Footer from './footer';
import Filter from './filter';
import SnackBar from './snackbar';

function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        async function fetchdata() {
            try {
                const res = await axios.get('http://localhost:8080/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = res.data;
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        }
        fetchdata();
    }, [token, navigate])

    // async function handleDelete(id) {
    //     const res = await axios.delete(`http://localhost:8080/products/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     if (res.data._id) {
    //         setProducts(products.filter(p => p._id !== res.data._id));
    //     }
    // }

    const handleClick = () => {
        navigate('/add');
    }

    const handleAddToCart = async (id) => {
        try {
            const res = await axios.post(`http://localhost:8080/cart/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    productId: id,
                }
            })
            const status = res.status;
            if (status === 200) {
                setShowSnackbar(true);
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert("Product already added");
            }
        }
    }

    const handleSort = (sortedProducts) => {
        setProducts(sortedProducts);
    };

    const handleStateChange = () => {
        setShowSnackbar(false);
    }

    return (
        <React.Fragment>
            <Filter onSort={handleSort}></Filter>
            <div className='grid grid-cols-3 px-4 mt-4 gap-4 mb-4'>
                {
                    products && products.map(p => {
                        return (
                            <div className='w-auto bg-white rounded-md shadow-md overflow-hidden basis-1/4
                       transform hover:scale-105 transition duration-300 static' key={p._id}>
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
                                {/* <button className='bg-cyan-500 hover:bg-cyan-600 rounded-full absolute bottom-0 right-0' onClick={() => handleDelete(p._id)}>
                                    <DeleteIcon></DeleteIcon>
                                </button> */}
                                <button className='bg-green w-24 text-sm rounded absolute bottom-2 right-2' onClick={() => handleAddToCart(p._id)}>Add to Cart</button>
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
            {showSnackbar && <SnackBar setState={showSnackbar} changeState={handleStateChange} />}
            <Footer />
        </React.Fragment>
    )
}

export default Product;