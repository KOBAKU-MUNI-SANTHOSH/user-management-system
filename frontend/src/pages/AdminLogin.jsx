import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authFetch, API_URL } from "../api/api";
import "./AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

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
    // ADMIN LOGIN
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
            // STORE ACCESS TOKEN
            // ==================================

            localStorage.setItem(
                "token",
                data.token
            );


            // ==================================
            // VERIFY ADMIN ROLE
            // ==================================

            const profileResponse =
                await authFetch(
                    "/users/profile"
                );


            const profileData =
                await profileResponse.json();


            if (!profileResponse.ok) {

                throw new Error(
                    profileData.message ||
                    "Unable to verify account"
                );

            }


            // ==================================
            // USER IS NOT ADMIN
            // ==================================

            if (
                profileData.role !==
                "admin"
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "role"
                );


                window.dispatchEvent(
                    new Event(
                        "authChanged"
                    )
                );


                throw new Error(
                    "Administrator privileges are required to access this page."
                );

            }


            // ==================================
            // ADMIN VERIFIED
            // ==================================

            localStorage.setItem(
                "role",
                "admin"
            );


            // ==================================
            // UPDATE NAVBAR
            // ==================================

            window.dispatchEvent(
                new Event(
                    "authChanged"
                )
            );


            // ==================================
            // GO TO ADMIN DASHBOARD
            // ==================================

            navigate(
                "/admin",
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
                new Event(
                    "authChanged"
                )
            );


            setMessage(
                error.message
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="admin-login-page">

            <section className="admin-login-card">


                {/* ==================================
                    ADMIN HEADER
                ================================== */}

                <div className="admin-login-header">

                    <div>

                        <span className="admin-login-label">

                            USER MANAGEMENT SYSTEM

                        </span>


                        <h1>
                            Admin Login
                        </h1>


                        <p>
                            Sign in with an administrator
                            account to continue.
                        </p>

                    </div>

                </div>



                {/* ==================================
                    ADMIN NOTICE
                ================================== */}

                <div className="admin-access-notice">

                    <div className="admin-notice-indicator">
                    </div>


                    <div>

                        <strong>
                            Administrator access
                        </strong>


                        <span>
                            This area is available only
                            to authorized administrators.
                        </span>

                    </div>

                </div>



                {/* ==================================
                    ERROR
                ================================== */}

                {message && (

                    <div className="admin-login-error">

                        <strong>
                            Login failed
                        </strong>


                        <p>
                            {message}
                        </p>

                    </div>

                )}



                {/* ==================================
                    LOGIN FORM
                ================================== */}

                <form
                    onSubmit={handleSubmit}
                    className="admin-login-form"
                >


                    {/* EMAIL */}

                    <div className="admin-form-group">

                        <label htmlFor="admin-email">

                            Administrator Email

                        </label>


                        <input
                            id="admin-email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            disabled={loading}
                            required
                        />

                    </div>



                    {/* PASSWORD */}

                    <div className="admin-form-group">

                        <label htmlFor="admin-password">

                            Password

                        </label>


                        <div className="admin-password-wrapper">

                            <input
                                id="admin-password"
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
                                required
                            />


                            <button
                                type="button"
                                className="admin-password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
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



                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >

                        {loading ? (

                            <>

                                <span className="admin-login-spinner">
                                </span>

                                Signing in...

                            </>

                        ) : (

                            "Sign in as Admin"

                        )}

                    </button>

                </form>



                {/* ==================================
                    FOOTER
                ================================== */}

                <div className="admin-login-footer">

                    <Link to="/login">

                        User Login

                    </Link>


                    <Link to="/">

                        Back to Home

                    </Link>

                </div>


            </section>

        </main>

    );

}


export default AdminLogin;