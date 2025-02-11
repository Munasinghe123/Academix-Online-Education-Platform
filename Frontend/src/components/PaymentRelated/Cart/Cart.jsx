import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart() {
   
    const{deleteCourse,cartItems}=useContext(CartContext);

    return (
        <div className="h-screen">
            <h1 className="mt-40">Cart</h1>
            <div className="flex flex-col gap-4 justify-center items-center">
                {cartItems.map((info, index) => (
                    <div key={index} className="flex flex-col border border-gray-300 rounded-lg shadow-lg bg-white p-4 w-60 items-center">
                        <h2 className="text-lg font-semibold">{info.courseId.courseName}</h2>

                        <img
                            src={`http://localhost:7001/uploads/${info.courseId.photo}`}
                            alt={info.courseId.courseName}
                            className="w-36 h-36 object-cover rounded-lg mx-auto my-2"
                        />

                        <div className="flex items-center justify-center gap-2">
                            <h4 className="font-semibold">Quantity:</h4>
                            <p>{info.quantity}</p>
                        </div>
                                        <button 
                    className="text-orange-500 hover:text-orange-600" 
                    onClick={() => {
                        deleteCourse(info._id);
                        setCartInfo(prevCart => prevCart.filter(item => item._id !== info._id)); // Remove item from UI
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
