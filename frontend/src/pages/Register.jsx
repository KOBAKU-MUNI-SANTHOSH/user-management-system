import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api/api";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    // ==========================================
    // REGISTER USER
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");


        // ======================================
        // CHECK PASSWORDS
        // ======================================

        if (password !== confirmPassword) {

            setMessageType("error");

            setMessage(
                "Passwords do not match."
            );

            return;

        }


        setLoading(true);


        try {

            // ==================================
            // REGISTER REQUEST
            // ==================================

            const response = await fetch(
                `${API_URL}/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );


            const data =
                await response.json();


            // ==================================
            // REGISTRATION FAILED
            // ==================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Registration failed"
                );

            }


            // ==================================
            // SUCCESS
            // ==================================

            setMessageType("success");

            setMessage(
                "Account created successfully. Redirecting to login..."
            );


            // ==================================
            // CLEAR FORM
            // ==================================

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");


            // ==================================
            // REDIRECT TO LOGIN
            // ==================================

            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true
                    }
                );

            }, 1200);


        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );


            setMessageType("error");

            setMessage(
                error.message
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="register-page">

            <div className="register-container">


                {/* ==================================
                    INTRO
                ================================== */}

                <div className="register-intro">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Create your account to start
                        managing your profile securely.
                    </p>

                </div>



                {/* ==================================
                    REGISTER CARD
                ================================== */}

                <div className="register-card">


                    {/* ==================================
                        HEADING
                    ================================== */}

                    <div className="register-heading">

                        <h2>
                            Get Started
                        </h2>

                        <p>
                            Enter your information below.
                        </p>

                    </div>



                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `register-message ${messageType}`
                            }
                        >

                            {message}

                        </div>

                    )}



                    {/* ==================================
                        FORM
                    ================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* ==================================
                            NAME
                        ================================== */}

                        <div className="register-form-group">

                            <label htmlFor="register-name">

                                Full Name

                            </label>

                            <input
                                id="register-name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                disabled={loading}
                                autoComplete="name"
                                required
                            />

                        </div>



                        {/* ==================================
                            EMAIL
                        ================================== */}

                        <div className="register-form-group">

                            <label htmlFor="register-email">

                                Email Address

                            </label>

                            <input
                                id="register-email"
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

                        <div className="register-form-group">

                            <label htmlFor="register-password">

                                Password

                            </label>


                            <div className="register-password-wrapper">

                                <input
                                    id="register-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                    autoComplete="new-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="register-password-toggle"
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
                            CONFIRM PASSWORD
                        ================================== */}

                        <div className="register-form-group">

                            <label htmlFor="confirm-password">

                                Confirm Password

                            </label>


                            <div className="register-password-wrapper">

                                <input
                                    id="confirm-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                    autoComplete="new-password"
                                    required
                                />

                            </div>


                            {/* PASSWORD MATCH STATUS */}

                            {confirmPassword && (

                                <span
                                    className={
                                        password ===
                                        confirmPassword
                                            ? "password-match"
                                            : "password-mismatch"
                                    }
                                >

                                    {password ===
                                    confirmPassword
                                        ? "Passwords match"
                                        : "Passwords do not match"}

                                </span>

                            )}

                        </div>



                        {/* ==================================
                            REGISTER BUTTON
                        ================================== */}

                        <button
                            type="submit"
                            className="register-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="register-spinner">
                                    </span>

                                    Creating account...

                                </>

                            ) : (

                                "Create Account"

                            )}

                        </button>

                    </form>



                    {/* ==================================
                        LOGIN LINK
                    ================================== */}

                    <p className="register-login-text">

                        Already have an account?{" "}

                        <Link to="/login">

                            Sign In

                        </Link>

                    </p>


                </div>

            </div>

        </main>

    );

}


export default Register;