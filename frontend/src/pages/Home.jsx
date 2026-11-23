import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    const isLoggedIn =
        Boolean(token);

    const isAdmin =
        role === "admin";


    return (

        <main className="home">

            <section className="home-content">


                {/* ==================================
                    HERO
                ================================== */}

                <div className="home-hero">
                    
                    <div className="home-badge">

                        <span className="home-badge-dot">
                        </span>

                        Secure User Management

                    </div>


                    <h1>

                        User Management

                        <span>
                            System
                        </span>

                    </h1>


                    <p className="home-description">

                        A secure full-stack application for
                        authentication, profile management,
                        password recovery and role-based
                        access control.

                    </p>


                    {/* ==================================
                        NOT LOGGED IN
                    ================================== */}

                    {!isLoggedIn && (

                        <div className="home-actions">

                            <Link
                                to="/register"
                                className="home-primary-btn"
                            >
                                Create Account
                            </Link>


                            <Link
                                to="/login"
                                className="home-secondary-btn"
                            >
                                Sign In
                            </Link>

                        </div>

                    )}


                    {/* ==================================
                        LOGGED IN USER
                    ================================== */}

                    {isLoggedIn && !isAdmin && (

                        <div className="home-actions">

                            <Link
                                to="/dashboard"
                                className="home-primary-btn"
                            >
                                Go to Dashboard
                            </Link>

                        </div>

                    )}


                    {/* ==================================
                        LOGGED IN ADMIN
                    ================================== */}

                    {isLoggedIn && isAdmin && (

                        <div className="home-actions">

                            <Link
                                to="/dashboard"
                                className="home-secondary-btn"
                            >
                                User Dashboard
                            </Link>


                            <Link
                                to="/admin"
                                className="home-primary-btn"
                            >
                                Admin Dashboard
                            </Link>

                        </div>

                    )}

                </div>


                {/* ==================================
                    FEATURES
                ================================== */}

                <div className="home-features">


                    <div className="feature-card">

                        <div className="feature-number">
                            01
                        </div>

                        <div>

                            <h3>
                                Secure Authentication
                            </h3>

                            <p>
                                Access accounts securely using
                                token-based authentication and
                                protected routes.
                            </p>

                        </div>

                    </div>


                    <div className="feature-card">

                        <div className="feature-number">
                            02
                        </div>

                        <div>

                            <h3>
                                Profile Management
                            </h3>

                            <p>
                                Update account information,
                                passwords and profile images
                                from one place.
                            </p>

                        </div>

                    </div>


                    <div className="feature-card">

                        <div className="feature-number">
                            03
                        </div>

                        <div>

                            <h3>
                                Role Authorization
                            </h3>

                            <p>
                                Separate user and administrator
                                permissions with protected
                                administrative actions.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    ADMIN ACCESS
                ================================== */}

                {!isLoggedIn && (

                    <div className="home-admin-section">

                        <div>

                            <strong>
                                Administrator Access
                            </strong>

                            <p>
                                Authorized administrators can
                                manage users from the admin
                                dashboard.
                            </p>

                        </div>


                        <Link
                            to="/admin-login"
                            className="home-admin-btn"
                        >
                            Admin Login
                        </Link>

                    </div>

                )}


            </section>

        </main>

    );

}


export default Home;