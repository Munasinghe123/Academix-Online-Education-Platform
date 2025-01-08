import React, { useContext, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import logo from './Academix.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const { user, logout } = useContext(AuthContext);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Toggle the dropdown visibility on click
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };

    return (
        <div>
            <header className='home-header'>
                <div className='header-content'>
                    <img src={logo} alt='Academix logo' className='logo' />
                    <p className='explore-dropdown'>Explore</p>

                    <div className='search-container'>
                        <input
                            type='text'
                            className='search-input'
                            placeholder='Search for courses...'
                        />
                        <span className='search-icon'>🔍</span>
                    </div>

                    <div className='message-and-button'>
                        <h1 className='welcome-message'>
                            Welcome, {user ? user.name : "Guest"}
                        </h1>

                        {user ? (
                            <>
                                <button className='logout-btn' onClick={logout}>
                                    Logout
                                </button>

                                {user.role === 'admin' && (
                                    <div className='hamburger-menu'>
                                        <button className='hamburger-btn' onClick={toggleDropdown}>

                                            <FontAwesomeIcon icon={isDropdownVisible ? faTimes : faBars} />
                                        </button>

                                        {isDropdownVisible && (
                                            <div className='dropdown-menu'>
                                                <Link to='/manage-users'>
                                                    <button className='dropdown-item'>
                                                        Manage Users
                                                    </button>
                                                </Link>
                                                <Link to='/manage-courses'>
                                                    <button className='dropdown-item'>
                                                        Manage Courses
                                                    </button>
                                                </Link>
                                                <Link to='/view-reports'>
                                                    <button className='dropdown-item'>
                                                        View Reports
                                                    </button>
                                                </Link>
                                               
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to='/login'>
                                <button className='login-btn'>Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
