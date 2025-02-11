import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';


function CourseDetails() {
    
    const{addToCart}=useContext(CartContext);
    
    const { id } = useParams();
    
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [instructorEmail, setInstructorEmail] = useState('');
    const [prerequisites, setPrerequisites] = useState('');
    const [price, setPrice] = useState('');
    const [topics, setTopics] = useState([]);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:7001/api/courses/getCourseById/${id}`);

                setCourseId(response.data._id);
                setCourseName(response.data.courseName);
                setCourseDescription(response.data.courseDescription);
                setInstructorName(response.data.instructorName);
                setInstructorEmail(response.data.instructorEmail);
                setPrerequisites(response.data.prerequisites);
                setPrice(response.data.price);
                setTopics(response.data.topics);
                setPhoto(response.data.photo);
            } catch (err) {
                console.log(err);
                alert("Couldn't fetch course details");
            }
        };

        fetchCourse();
    }, [id]);
    

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6 mt-20">
            <h1 className="text-4xl font-extrabold text-gray-900">{courseName}</h1>

            {photo && (
                <img src={`http://localhost:7001/uploads/${photo}`} alt={courseName} 
                    className="mt-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto" />
            )}

            <p className="mt-6 text-xl text-gray-700 leading-relaxed">{courseDescription}</p>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Instructor Information</h2>
                <p className="mt-2 text-gray-700"><strong>Name:</strong> {instructorName}</p>
                <p className="mt-2 text-gray-700"><strong>Email:</strong> {instructorEmail}</p>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Course Price</h2>
                <p className="mt-2 text-lg font-semibold text-gray-900">${price}</p>

                <button onClick={()=>addToCart(courseId)} 
                    className="mt-5 w-full sm:w-auto text-white bg-red-500 hover:bg-red-600 
                    focus:outline-none focus:ring-4 focus:ring-red-300 rounded-md px-6 py-3 text-lg 
                    font-semibold shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default CourseDetails;
