import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import "./Navbar.css";


function Navbar() {

    const navigate = useNavigate();


    // ==========================================
    // AUTHENTICATION STATE
    // ==========================================

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );


    const isAdmin =
        token && role === "admin";


    // ==========================================
    // LISTEN FOR LOGIN / LOGOUT CHANGES
    // ==========================================

    useEffect(() => {

        const updateAuth = () => {

            setToken(
                localStorage.getItem("token")
            );

            setRole(
                localStorage.getItem("role")
            );

        };


        window.addEventListener(
            "authChanged",
            updateAuth
        );


        // Handles localStorage changes from
        // another browser tab
        window.addEventListener(
            "storage",
            updateAuth
        );


        return () => {

            window.removeEventListener(
                "authChanged",
                updateAuth
            );

            window.removeEventListener(
                "storage",
                updateAuth
            );

        };

    }, []);



    // ==========================================
    // LOGOUT STATES
    // ==========================================

    const [showLogoutModal, setShowLogoutModal] =
        useState(false);

    const [loggingOut, setLoggingOut] =
        useState(false);



    // ==========================================
    // THEME STATE
    // ==========================================

    const [theme, setTheme] = useState(() => {

        return (
            localStorage.getItem("theme") ||
            "light"
        );

    });



    // ==========================================
    // APPLY THEME
    // ==========================================

    useEffect(() => {

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );


        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);



    // ==========================================
    // TOGGLE THEME
    // ==========================================

    const toggleTheme = () => {

        setTheme((currentTheme) =>

            currentTheme === "light"
                ? "dark"
                : "light"

        );

    };



    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = async () => {

        if (loggingOut) {
            return;
        }


        setLoggingOut(true);


        try {

            // Clears HttpOnly refresh token cookie
            await logoutUser();


        } catch (error) {

            console.error(
                "Logout error:",
                error
            );


        } finally {

            // ==================================
            // CLEAR FRONTEND AUTH
            // ==================================

            localStorage.removeItem("token");
            localStorage.removeItem("role");


            // ==================================
            // UPDATE NAVBAR IMMEDIATELY
            // ==================================

            setToken(null);
            setRole(null);


            window.dispatchEvent(
                new Event("authChanged")
            );


            // ==================================
            // SHORT LOGOUT CONFIRMATION
            // ==================================

            setTimeout(() => {

                setLoggingOut(false);

                setShowLogoutModal(false);

                navigate("/login");

            }, 700);

        }

    };



    return (

        <>

            {/* ==================================
                NAVBAR
            ================================== */}

            <nav className="navbar">


                {/* ==================================
                    BRAND
                ================================== */}

                <Link
                    to="/"
                    className="navbar-brand"
                >

                    <div className="navbar-brand-text">

                        <strong>
                            User Management
                        </strong>

                        <span>
                            SYSTEM
                        </span>

                    </div>

                </Link>



                {/* ==================================
                    NAVIGATION
                ================================== */}

                <div className="nav-links">


                    {/* HOME */}

                    <Link to="/">
                        Home
                    </Link>



                    {/* ==================================
                        THEME TOGGLE
                    ================================== */}

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle light and dark mode"
                        title={
                            theme === "light"
                                ? "Switch to Dark Mode"
                                : "Switch to Light Mode"
                        }
                    >

                        <span
                            className={
                                `theme-toggle-circle ${
                                    theme === "dark"
                                        ? "dark"
                                        : ""
                                }`
                            }
                        >
                        </span>

                    </button>



                    {/* ==================================
                        NOT LOGGED IN
                    ================================== */}

                    {!token ? (

                        <>

                            <Link to="/login">
                                Login
                            </Link>


                            <Link
                                to="/register"
                                className="navbar-register-btn"
                            >
                                Register
                            </Link>

                        </>

                    ) : (

                        /* ==================================
                            LOGGED IN
                        ================================== */

                        <>


                            {/* USER DASHBOARD */}

                            <Link to="/dashboard">

                                {isAdmin
                                    ? "User Dashboard"
                                    : "Dashboard"}

                            </Link>



                            {/* ADMIN DASHBOARD */}

                            {isAdmin && (

                                <Link
                                    to="/admin"
                                    className="navbar-admin-btn"
                                >
                                    Admin Dashboard
                                </Link>

                            )}



                            {/* LOGOUT */}

                            <button
                                className="navbar-logout-btn"
                                onClick={() =>
                                    setShowLogoutModal(true)
                                }
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            </nav>



            {/* ==================================
                LOGOUT MODAL
            ================================== */}

            {showLogoutModal && (

                <div
                    className="logout-overlay"
                    onClick={() => {

                        if (!loggingOut) {

                            setShowLogoutModal(
                                false
                            );

                        }

                    }}
                >

                    <div
                        className="logout-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* ==================================
                            LOGOUT ICON
                        ================================== */}

                        <div
                            className={
                                loggingOut
                                    ? "logout-icon logging-out"
                                    : "logout-icon"
                            }
                        >

                            {loggingOut
                                ? "✓"
                                : "↪"}

                        </div>



                        {/* ==================================
                            CONFIRMATION
                        ================================== */}

                        {!loggingOut ? (

                            <>

                                <div className="logout-modal-heading">

                                    <h2>
                                        Log out?
                                    </h2>

                                    <p>
                                        Are you sure you want
                                        to end your current
                                        session?
                                    </p>

                                </div>


                                <div className="logout-actions">


                                    <button
                                        className="logout-cancel"
                                        disabled={loggingOut}
                                        onClick={() =>
                                            setShowLogoutModal(
                                                false
                                            )
                                        }
                                    >
                                        Stay Logged In
                                    </button>


                                    <button
                                        className="logout-confirm"
                                        disabled={loggingOut}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </div>

                            </>

                        ) : (

                            /* ==================================
                                LOGGING OUT
                            ================================== */

                            <div className="logout-processing">

                                <h2>
                                    Logged Out
                                </h2>

                                <p>
                                    Your session has been
                                    securely ended.
                                </p>


                                <div className="logout-progress">

                                    <div className="logout-progress-bar">
                                    </div>

                                </div>


                                <span className="logout-redirect-text">
                                    Redirecting to login...
                                </span>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </>

    );

}


export default Navbar;