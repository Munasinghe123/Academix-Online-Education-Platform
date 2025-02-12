import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import learning from './learning.jpg';
import axios from 'axios';

function LandingPage() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {

        const fetchCourses = async () => {

            try {
                const response = await axios.get(`http://localhost:7001/api/courses/getAllCourses`)
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCourses();
    }, [])


    return (
        <div className="landing-page">

            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        Unlock Your Potential with Expert-Led Online Courses
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Learn Anytime, Anywhere at Your Own Pace
                    </motion.p>
                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                    >
                        <Link to="/register">
                            <button className="btn primary-btn">Get Started for Free</button>
                        </Link>

                        <Link to='/ViewCourses'>
                            <button className="btn secondary-btn">Explore Courses</button>
                        </Link>

                    </motion.div>
                </div>
                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    <img src={learning} alt="Online Learning" />
                </motion.div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
                className="features-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.2 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                }}
            >
                <h2>Why Choose Academix?</h2>
                <div className="features-grid">
                    <motion.div className="feature-item">
                        <span>🎓</span>
                        <h3>Expert Instructors</h3>
                        <p>Learn from industry-leading experts with years of experience.</p>
                    </motion.div>
                    <motion.div className="feature-item">
                        <span>🕒</span>
                        <h3>Flexible Schedules</h3>
                        <p>Study at your own pace with lifetime access to courses.</p>
                    </motion.div>
                    <motion.div className="feature-item">
                        <span>📜</span>
                        <h3>Certifications</h3>
                        <p>Get certified to showcase your skills to employers.</p>
                    </motion.div>
                    <motion.div className="feature-item">
                        <span>🌍</span>
                        <h3>Global Community</h3>
                        <p>Connect with learners from around the world.</p>
                    </motion.div>
                </div>
            </motion.section>

            <div className="flex flex-wrap gap-x-6">
                {courses.map((course, index) => {
                    return (
                        <Link to={`/courseDetails/${course._id}`}>
                            <div
                                key={index}
                                className="flex flex-col border border-gray-300 rounded-lg shadow-lg bg-white p-4 w-64"
                            >
                                <img
                                    src={`http://localhost:7001/uploads/${course.photo}`}
                                    alt={course.courseName}
                                    className="w-full h-36 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-lg font-bold mb-2">{course.courseName}</h4>
                                <p className="text-gray-600">{course.courseDescription}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}

export default LandingPage;
