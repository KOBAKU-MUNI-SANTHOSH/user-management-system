import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import UploadProfile from "./pages/UploadProfile";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import AdminLogin from "./pages/AdminLogin";

import "./App.css";


function App() {


    // ==========================================
    // LOAD SAVED THEME
    // ==========================================

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme") ||
            "light";


        document.documentElement.setAttribute(
            "data-theme",
            savedTheme
        );

    }, []);



    return (

        <div className="app">


            {/* ==================================
                NAVBAR
            ================================== */}

            <Navbar />



            {/* ==================================
                ROUTES
            ================================== */}

            <Routes>


                {/* ==================================
                    HOME
                ================================== */}

                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />



                {/* ==================================
                    LOGIN

                    Logged-in users cannot access
                    this page.
                ================================== */}

                <Route
                    path="/login"
                    element={

                        <PublicRoute>

                            <Login />

                        </PublicRoute>

                    }
                />



                {/* ==================================
                    REGISTER

                    Logged-in users cannot access
                    this page.
                ================================== */}

                <Route
                    path="/register"
                    element={

                        <PublicRoute>

                            <Register />

                        </PublicRoute>

                    }
                />



                {/* ==================================
                    USER DASHBOARD
                ================================== */}

                <Route
                    path="/dashboard"
                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }
                />



                {/* ==================================
                    EDIT PROFILE
                ================================== */}

                <Route
                    path="/edit-profile"
                    element={

                        <ProtectedRoute>

                            <EditProfile />

                        </ProtectedRoute>

                    }
                />



                {/* ==================================
                    CHANGE PASSWORD
                ================================== */}

                <Route
                    path="/change-password"
                    element={

                        <ProtectedRoute>

                            <ChangePassword />

                        </ProtectedRoute>

                    }
                />



                {/* ==================================
                    UPLOAD PROFILE IMAGE
                ================================== */}

                <Route
                    path="/upload-profile"
                    element={

                        <ProtectedRoute>

                            <UploadProfile />

                        </ProtectedRoute>

                    }
                />



                {/* ==================================
                    FORGOT PASSWORD
                ================================== */}

                <Route
                    path="/forgot-password"
                    element={
                        <ForgotPassword />
                    }
                />



                {/* ==================================
                    RESET PASSWORD
                ================================== */}

                <Route
                    path="/reset-password"
                    element={
                        <ResetPassword />
                    }
                />



                {/* ==================================
                    ADMIN LOGIN
                ================================== */}

                <Route
                    path="/admin-login"
                    element={
                        <AdminLogin />
                    }
                />



                {/* ==================================
                    ADMIN DASHBOARD
                ================================== */}

                <Route
                    path="/admin"
                    element={

                        <AdminRoute>

                            <AdminDashboard />

                        </AdminRoute>

                    }
                />


            </Routes>

        </div>

    );

}


export default App;