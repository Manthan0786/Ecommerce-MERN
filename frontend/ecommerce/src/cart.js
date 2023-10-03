import { useEffect, useState } from "react";
import Header from "./header";
import axios from "axios";
import cart from "./images/cart.png";

function Cart() {
    const token = sessionStorage.getItem('token');
    const [cartProducts, setCartProducts] = useState([]);
    useEffect(() => {
        async function fetchCartProducts() {
            const res = await axios.get('http://localhost:8080/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data;
            setCartProducts(data);
        }
        fetchCartProducts();
    }, [token])

    const handleRemoveFromCart = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data;
            const filteredproduct = cartProducts.filter((c) => c._id !== id)
            setCartProducts(filteredproduct);
        } catch (error) {
            alert(error.response.data);
        }
    }
    return (
        <>
            <Header />
            {cartProducts.length > 0 ?
                <div className="bg-gray-100 w-full h-full p-2">
                    {
                        cartProducts.map((c) => {
                            return (
                                <div key={c._id} className="bg-gray-200 p-3 grid grid-cols-4 place-items-center">
                                    <div className="bg-amber relative w-40 h-30">
                                        <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                                    </div>
                                    <p>{c.title}</p>
                                    <span>
                                        ${c.price}
                                    </span>
                                    <button className="bg-red-500 border-1 text-xs p-1 rounded-md" onClick={() => handleRemoveFromCart(c._id)}>Remove from cart</button>
                                </div>
                            )
                        })
                    }
                </div> :
                <div className="flex flex-col justify-center items-center p-14">
                    <img className="w-44" src={cart} />
                    <h1>Cart is Empty!</h1>
                </div>
            }
        </>
    )
}

export default Cart;