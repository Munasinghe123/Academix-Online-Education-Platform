import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useCallback } from "react";

export const CartContext = createContext();

const CartProvider = ({ children, userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState([]);

    const{user}=useContext(AuthContext)

    const navigate=useNavigate();

    //get the cart items
    const fetchCartItems = async (userId) => {
        try {
            if (!userId) return;
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:7001/api/cart/getCartById/${userId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setCartItems(response.data.cartItems);
            
            setTotalPrice(response.data.cartItems.map(item => item?.courseId?.price || 0)); //optional rendering,fetches the courseId if the items exixts and soon.

        } catch (err) {
            console.error("Error fetching cart items:", err);
        }
    };
    

    //get the cart items after login
    useEffect(() => {
        if (user?.id) {
            console.log("length of cart items in Context",cartItems.length)
            console.log("prices",totalPrice)
            fetchCartItems(user.id);
        }else if(!user){
            setCartItems([])
        }
    }, [user]); 
     

    //adding to the cart
    const addToCart = async (courseId) => {
        if (!user) {
            navigate("/login", { state: { from: "/cart" } });
            return;
        }
    
        try {
            const accessToken = localStorage.getItem("accessToken");
    
            const response = await axios.post(
                `http://localhost:7001/api/cart/addToCart`,
                { userId: user.id, courseId, quantity: 1 },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            fetchCartItems(user.id);
            if(response.status===200){
                navigate("/cart")
            }

        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            alert(error.response.data.message);
        }
    };

    const deleteCourse = async (courseId) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await axios.delete(`http://localhost:7001/api/cart/deleteItem/${courseId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
    
            // Update the cartItems state after successful deletion
            setCartItems(prevCartItems => prevCartItems.filter(item => item._id !== courseId));
    
        } catch (err) {
            console.error("Error deleting cart item", err);
        }
    };
    
    return (
        <CartContext.Provider value={{ cartItems, totalPrice, fetchCartItems, addToCart,deleteCourse }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
