import React, { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'; 

function Cart() {

    const[cartinfo,setCartInfo] = useState('');
    const{user} = useContext(AuthContext);

    useEffect(()=>{

        const fetchCartInfo=async()=>{
            try{
                const accessToken = localStorage.getItem("accessToken")
    
                const response = await axios.get(`http://localhost:7001/api/cart/getCartById/${user.id}`,{
                    headers:{Authorization:`Bearer ${accessToken}`}
                })

                setCartInfo(response.data.cartItems)
                console.log("ur cart items",response.data.cartItems)
            }catch(err){

            }
        }
        fetchCartInfo();
        
    },[user])

    return (
        <div className='h-screen'>
            <h1 className='mt-40'>Cart</h1>
        </div>
    )
}

export default Cart
