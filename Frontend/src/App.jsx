import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import LandingPage from './components/common/LandingPage/LandingPage'
import Login from './components/common/Login/Login'
import Register from './components/common/Register/Register'
import Header from './components/common/Header/Header'
import Footer from './components/common/Footer/Footer'
import UserDashBoard from './components/user/UserDashBoard/UserDashBoard'
import AdminDashBoard from './components/Admin/AdminDashBaord/AdminDashBoard'
import CourseProviderDashBaord from './components/CourseProviders/CourseProviderDashBoard'
import AddCourseProviders from './components/Admin/AddCourseProviders/AddCourseProviders'
import ViewUsers from './components/Admin/VIewUsers/ViewUsers'

function App() {

  const { user } = useContext(AuthContext)

  return (
    <>
      <Header />
      <Routes>
        {user ? (
          <>
            {
              user.role === 'admin' && (
                <>
                  <Route path='/' element={<LandingPage />} />
                  <Route path='/adminDashBoard' element={<AdminDashBoard />} />
                  <Route path='/add-CourseProviders' element={<AddCourseProviders />} />
                  <Route path='/view-users' element={<ViewUsers />} />

                </>
              )
            }
            {
              user.role === "courseProvider" && (
                <>
                  <Route path='/CourseProviderDashBaord' element={<CourseProviderDashBaord />} />
                </>
              )
            }
            {
              user.role === "student" && (
                <>
                  <Route path='/studentDashBoard' element={<UserDashBoard />} />
                </>
              )
            }
          </>
        ) : (
          <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
        )

        }
      </Routes>
      <Footer />


    </>
  )
}

export default App
