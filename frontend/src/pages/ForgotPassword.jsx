import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api/api";
import "./ForgotPassword.css";

function ForgotPassword() {

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    // ==========================================
    // SEND PASSWORD RESET LINK
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");

        try {

            setLoading(true);


            // ======================================
            // FORGOT PASSWORD REQUEST
            // ======================================

            const response = await fetch(
                `${API_URL}/users/forgot-password`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email
                    })
                }
            );


            const data =
                await response.json();


            // ======================================
            // REQUEST FAILED
            // ======================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to send password reset email."
                );

            }


            // ======================================
            // SUCCESS
            // ======================================

            setMessage(
                data.message ||
                "Password reset link sent. Please check your email."
            );

            setMessageType(
                "success"
            );

            setEmail("");


        } catch (error) {

            setMessage(
                error.message ||
                "Unable to send password reset email."
            );

            setMessageType(
                "error"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="forgot-page">

            <div className="forgot-container">


                {/* ==================================
                    PAGE INTRO
                ================================== */}

                <div className="forgot-intro">

                    <div className="forgot-brand">
                        R
                    </div>

                    <h1>
                        Forgot Password?
                    </h1>

                    <p>
                        Enter your registered email address
                        and we'll send you a password reset link.
                    </p>

                </div>


                {/* ==================================
                    CARD
                ================================== */}

                <div className="forgot-card">


                    {/* ==================================
                        HEADING
                    ================================== */}

                    <div className="forgot-heading">

                        <h2>
                            Reset Password
                        </h2>

                        <p>
                            We'll send recovery instructions
                            to your registered email.
                        </p>

                    </div>


                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `forgot-message ${messageType}`
                            }
                        >

                            {message}

                        </div>

                    )}


                    {/* ==================================
                        FORM
                    ================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* EMAIL */}

                        <div className="forgot-form-group">

                            <label htmlFor="forgot-email">

                                Email Address

                            </label>


                            <div className="forgot-input-wrapper">

                                <input
                                    id="forgot-email"
                                    type="email"
                                    placeholder="Enter your registered email"
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

                        </div>


                        {/* ==================================
                            INFORMATION
                        ================================== */}

                        <div className="forgot-info-box">

                            <strong>
                                Secure email recovery
                            </strong>

                            <p>
                                If an account exists with this
                                email, we'll send a password reset
                                link that expires in 15 minutes.
                            </p>

                        </div>


                        {/* ==================================
                            SEND BUTTON
                        ================================== */}

                        <button
                            className="forgot-submit"
                            type="submit"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="forgot-spinner">
                                    </span>

                                    Sending Reset Link...

                                </>

                            ) : (

                                "Send Reset Link"

                            )}

                        </button>

                    </form>


                    {/* ==================================
                        BACK TO LOGIN
                    ================================== */}

                    <div className="forgot-footer">

                        <p>
                            Remember your password?
                        </p>

                        <Link
                            to="/login"
                            className="forgot-login-link"
                        >
                            Back to Sign In
                        </Link>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default ForgotPassword;