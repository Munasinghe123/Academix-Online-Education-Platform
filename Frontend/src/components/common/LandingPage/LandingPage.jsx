import React from 'react';
import './LandingPage.css';
import learning from './learning.jpg'
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-page">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Unlock Your Potential with Expert-Led Online Courses</h1>
                    <p>Learn Anytime, Anywhere at Your Own Pace</p>
                    <div className="hero-buttons">
                        <Link to='/register'> <button className="btn primary-btn">Get Started for Free</button></Link>
                        <button className="btn secondary-btn">Explore Courses</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={learning} alt="Online Learning" />
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="features-section">
                <h2>Why Choose Academix?</h2>
                <div className="features-grid">
                    <div className="feature-item">
                        <span>🎓</span>
                        <h3>Expert Instructors</h3>
                        <p>Learn from industry-leading experts with years of experience.</p>
                    </div>
                    <div className="feature-item">
                        <span>🕒</span>
                        <h3>Flexible Schedules</h3>
                        <p>Study at your own pace with lifetime access to courses.</p>
                    </div>
                    <div className="feature-item">
                        <span>📜</span>
                        <h3>Certifications</h3>
                        <p>Get certified to showcase your skills to employers.</p>
                    </div>
                    <div className="feature-item">
                        <span>🌍</span>
                        <h3>Global Community</h3>
                        <p>Connect with learners from around the world.</p>
                    </div>
                </div>
            </section>

            {/* Popular Courses Section */}
            <section className="courses-section">
                <h2>Explore Popular Courses</h2>
                <div className="courses-grid">
                    <div className="course-card">
                        <img src="https://via.placeholder.com/200" alt="Web Development" />
                        <h3>Web Development</h3>
                        <p>Learn web Development</p>
                    </div>
                    <div className="course-card">
                        <img src="https://via.placeholder.com/200" alt="Data Science" />
                        <h3>Data Science</h3>
                    </div>
                    <div className="course-card">
                        <img src="https://via.placeholder.com/200" alt="Graphic Design" />
                        <h3>Graphic Design</h3>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default LandingPage;
