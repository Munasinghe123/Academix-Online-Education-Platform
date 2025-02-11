import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartItems = async (userId) => {
        try {
            if (!userId) return;
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:7001/api/cart/getCartById/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setCartItems(response.data.cartItems);
        } catch (err) {
            console.error("Error fetching cart items:", err);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, fetchCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
