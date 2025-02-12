import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cart() {
    const { deleteCourse, cartItems,totalPrice } = useContext(CartContext);

    // Calculate the total price of the cart
    const paymentPrice = totalPrice.reduce((acc, price) => acc + price, 0);

    return (
        <div className="mt-20 h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6 flex flex-col overflow-auto">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Shopping Cart</h1>

                {/* Display total price */}
                <div className="text-xl font-semibold text-gray-800 mb-6">
                    <span>Total Price: </span>
                    <span className="text-orange-500">${paymentPrice}</span>
                </div>

                            {/* Cart items */}
                            <div className="flex flex-wrap gap-8 justify-center">
                {cartItems.length > 0 ? (

                    
                    
                    cartItems.map((info, index) => (
                        <Link to={`/courseDetails/${info.courseId._id}`}>
                        <div
                            key={index}
                            className="flex flex-col justify-between bg-white rounded-lg shadow-lg overflow-hidden w-64 p-4 hover:shadow-xl transition-shadow duration-300 h-full"
                        >
                            {/* Course Content */}
                            <div className="flex-grow">
                                {/* Course Name */}
                                <h2 className="text-lg font-semibold text-gray-800">{info.courseId.courseName}</h2>

                                {/* Course Image */}
                                <img
                                    src={`http://localhost:7001/uploads/${info.courseId.photo}`}
                                    alt={info.courseId.courseName}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />

                                {/* Quantity */}
                                <div className="flex items-center justify-between text-gray-600">
                                    <span className="font-semibold">Quantity:</span>
                                    <span>{info.quantity}</span>
                                </div>
                            </div>

                            {/* Remove Item Button */}
                            <button
                                className="mt-4 text-red-500 hover:text-red-700 transition duration-200"
                                onClick={(e) => {
                                    deleteCourse(info._id)
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                            </button>
                        </div>
                        </Link>

                    ))
                   
                ) : (
                    <div className="text-center text-lg text-gray-600 w-full">Your cart is empty!</div>
                )}
            </div>
            
            <div className="mt-8 flex justify-center">
                <Link to="/ViewCourses">
                    <button className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300">
                        Buy more courses
                    </button>
                </Link>
            </div>

                        
                {cartItems.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Link to='/payment'>
                        <button
                            className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300"
                        >
                            Proceed to Checkout
                        </button>
                        </Link>

                        
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
