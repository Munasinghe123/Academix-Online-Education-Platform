import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import logo from './Academix.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header() {
    const { user, logout } = useContext(AuthContext);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isUserSubmenuVisible, setIsUserSubmenuVisible] = useState(false);
    const [isCourseSubmenuVisible, setIsCourseSubmenuVisible] = useState(false);
    const [isRegisterUsersVisible, setIsRegisterUsersVisible] = useState(false);

    const [photo, setPhoto] = useState(null);

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        const fetchUserPhoto = async () => {
            if (user && user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setPhoto(response.data.user.photo);
                } catch (err) {
                    console.log('Error fetching user photo:', err);
                }
            } else {
                setPhoto(null); // Clear photo when user is null
            }
        };

        fetchUserPhoto();
    }, [user]); // Runs whenever the 'user' changes


    return (
        <header className="bg-white text-black py-5 px-10 flex justify-between items-center shadow-md fixed top-0 left-0 w-full h-24 z-50 backdrop-blur-sm">
            <div className="flex items-center justify-between w-full">
                <Link to="/">
                    <img src={logo} alt="Academix logo" className="w-24 h-auto rounded" />
                </Link>

                <div className="relative ml-12 flex-grow">
                    <input
                        type="text"
                        className="py-2 px-4 pl-12 border-2 border-gray-300 rounded-full text-base w-[600px] focus:outline-none focus:border-orange-400"
                        placeholder="Search for courses..."
                    />
                    <span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-lg">🔍</span>
                </div>

                <div className="flex items-center ml-5">
                    <h2 className="text-black mr-5">
                        Welcome, {user ? user.name : 'Guest'}
                    </h2>

                    {photo ? (
                        <img
                            src={`http://localhost:7001/uploads/${photo}`}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                    ) : (
                        <>
                            <img
                                src="/defaultAvatar.jpg"
                                alt="Default Avatar"
                                className="w-10 h-10 rounded-full object-cover mr-3"
                            />
                        </>
                    )}

                    {user ? (
                        <>


                            {/* Dropdown Button */}
                            <button
                                className="text-2xl bg-transparent border-none cursor-pointer text-orange-400 font-bold hover:text-orange-500 ml-3"
                                onClick={toggleDropdown}
                            >
                                <FontAwesomeIcon icon={isDropdownVisible ? faTimes : faBars} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownVisible && (
                                <div className="absolute top-10 right-0 bg-white rounded shadow-lg w-48 mt-8 z-50">
                                    <Link to="/profile">
                                        <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">View Profile</button>
                                    </Link>

                                    {user.role === 'courseProvider' && (
                                        <>
                                            <Link to="/add-courses">
                                                <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">Add Courses</button>
                                            </Link>

                                            <Link to="/CourseProviderDashBaord">
                                                <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">DashBoard</button>
                                            </Link>
                                        </>
                                    )}

                                    {user.role === 'admin' && (
                                        <>
                                            <Link to="/adminDashBoard">
                                                <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">Admin Dashboard</button>
                                            </Link>

                                            <div
                                                className="relative"
                                                onMouseEnter={() => setIsUserSubmenuVisible(true)}
                                                onMouseLeave={() => setIsUserSubmenuVisible(false)}
                                            >
                                                <p className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                                                    Manage Users
                                                </p>
                                                {isUserSubmenuVisible && (
                                                    <div className="absolute top-0 right-full bg-white rounded shadow-lg w-48">
                                                        <Link to="/add-CourseProviders">
                                                            <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                Add Course Providers
                                                            </button>
                                                        </Link>
                                                        <div
                                                            onMouseEnter={() => setIsRegisterUsersVisible(true)}
                                                            onMouseLeave={() => setIsRegisterUsersVisible(false)}
                                                        >
                                                            <p className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                View Users
                                                            </p>
                                                            {isRegisterUsersVisible && (
                                                                <>
                                                                    <Link to="/ViewCourseProviders">
                                                                        <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                            View Course Providers
                                                                        </button>
                                                                    </Link>
                                                                    <Link to="/ViewStudents">
                                                                        <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                            View Students
                                                                        </button>
                                                                    </Link>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                className="relative"
                                                onMouseEnter={() => setIsCourseSubmenuVisible(true)}
                                                onMouseLeave={() => setIsCourseSubmenuVisible(false)}
                                            >
                                                <p className="px-5 py-3 hover:bg-gray-100 cursor-pointer">
                                                    Manage Courses
                                                </p>
                                                {isCourseSubmenuVisible && (
                                                    <div className="absolute top-0 right-full bg-white rounded shadow-lg w-48">
                                                        <Link to="/add-courses">
                                                            <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                Add Courses
                                                            </button>
                                                        </Link>
                                                        <Link to="/view-courses">
                                                            <button className="block w-full px-5 py-3 text-left hover:bg-gray-100">
                                                                View Courses
                                                            </button>
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </>

                                    )}
                                    <button
                                        className="block w-full px-5 py-3 text-left bg-orange-400 text-white rounded hover:bg-orange-500"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to="/login">
                            <button className="py-2 px-4 bg-orange-400 text-white rounded hover:bg-orange-500">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
