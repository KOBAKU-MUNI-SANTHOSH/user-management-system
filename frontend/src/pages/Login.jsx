import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();


    // ==========================================
    // STATES
    // ==========================================

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");


    // ==========================================
    // USER LOGIN
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");


        try {

            // ==================================
            // LOGIN REQUEST
            // ==================================

            const response = await fetch(
                `${API_URL}/users/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data =
                await response.json();


            // ==================================
            // LOGIN FAILED
            // ==================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Invalid email or password"
                );

            }


            // ==================================
            // TOKEN NOT RECEIVED
            // ==================================

            if (!data.token) {

                throw new Error(
                    "Authentication token was not received"
                );

            }


            // ==================================
            // SAVE ACCESS TOKEN
            // ==================================

            localStorage.setItem(
                "token",
                data.token
            );


            // Normal login should not keep
            // an old admin role.

            localStorage.removeItem(
                "role"
            );


            // ==================================
            // UPDATE NAVBAR
            // ==================================

            window.dispatchEvent(
                new Event("authChanged")
            );


            // ==================================
            // GO TO DASHBOARD
            // ==================================

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );


        } catch (error) {

            // ==================================
            // CLEAR FAILED AUTH STATE
            // ==================================

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "role"
            );


            window.dispatchEvent(
                new Event("authChanged")
            );


            setMessage(
                error.message
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="login-page">

            <div className="login-container">


                {/* ==================================
                    PAGE INTRO
                ================================== */}

                <div className="login-intro">

                    <h1>
                        Welcome Back
                    </h1>


                    <p>
                        Sign in to continue to your
                        User Management account.
                    </p>

                </div>



                {/* ==================================
                    LOGIN CARD
                ================================== */}

                <div className="login-card">


                    {/* ==================================
                        CARD HEADING
                    ================================== */}

                    <div className="login-heading">

                        <h2>
                            Sign In
                        </h2>


                        <p>
                            Enter your account details
                            below.
                        </p>

                    </div>



                    {/* ==================================
                        ERROR MESSAGE
                    ================================== */}

                    {message && (

                        <div className="login-message error">

                            {message}

                        </div>

                    )}



                    {/* ==================================
                        LOGIN FORM
                    ================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* ==================================
                            EMAIL
                        ================================== */}

                        <div className="login-form-group">

                            <label htmlFor="email">

                                Email Address

                            </label>


                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="email"
                                required
                            />

                        </div>



                        {/* ==================================
                            PASSWORD
                        ================================== */}

                        <div className="login-form-group">


                            {/* LABEL + FORGOT PASSWORD */}

                            <div className="login-label-row">

                                <label htmlFor="password">

                                    Password

                                </label>


                                <Link
                                    to="/forgot-password"
                                    className="login-forgot-link"
                                >

                                    Forgot Password?

                                </Link>

                            </div>



                            {/* PASSWORD INPUT */}

                            <div className="login-password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                    autoComplete="current-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="login-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    disabled={loading}
                                >

                                    {showPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>

                        </div>



                        {/* ==================================
                            LOGIN BUTTON
                        ================================== */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="login-spinner">
                                    </span>

                                    Signing in...

                                </>

                            ) : (

                                "Sign In"

                            )}

                        </button>

                    </form>



                    {/* ==================================
                        REGISTER
                    ================================== */}

                    <p className="login-register-text">

                        Don't have an account?{" "}

                        <Link to="/register">

                            Create Account

                        </Link>

                    </p>



                    {/* ==================================
                        ADMIN LOGIN
                    ================================== */}

                    <div className="login-admin">

                        <Link to="/admin-login">

                            Administrator Login

                        </Link>

                    </div>


                </div>

            </div>

        </main>

    );

}


export default Login;