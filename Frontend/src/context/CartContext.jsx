import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);



    const addToCart = async (courseId, quantity) => {
        try {
            const accessToken = localStorage.getItem("accessToken");

            const response = await axios.post(`http://localhost:7001/api/cart/addToCart`,
                {
                    userId: user.id,
                    courseId,
                    quantity
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            setCart(response.data.cartItem);
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
