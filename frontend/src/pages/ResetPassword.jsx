import { useState } from "react";
import {
    useNavigate,
    useLocation,
    Link
} from "react-router-dom";

import { API_URL } from "../api/api";
import "./ResetPassword.css";


function ResetPassword() {

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword
    ] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    const navigate = useNavigate();
    const location = useLocation();


    // ==========================================
    // GET RESET TOKEN FROM URL
    // ==========================================

    const searchParams =
        new URLSearchParams(location.search);

    const resetToken =
        searchParams.get("token");


    // ==========================================
    // RESET PASSWORD
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");


        // ======================================
        // TOKEN CHECK
        // ======================================

        if (!resetToken) {

            setMessage(
                "Reset link is invalid. Please request a new password reset."
            );

            setMessageType("error");

            return;
        }


        // ======================================
        // PASSWORD LENGTH
        // ======================================

        if (newPassword.length < 6) {

            setMessage(
                "Password must contain at least 6 characters."
            );

            setMessageType("error");

            return;
        }


        // ======================================
        // PASSWORD MATCH
        // ======================================

        if (
            newPassword !==
            confirmPassword
        ) {

            setMessage(
                "Passwords do not match."
            );

            setMessageType("error");

            return;
        }


        try {

            setLoading(true);


            // ==================================
            // RESET PASSWORD REQUEST
            // ==================================

            const response =
                await fetch(
                    `${API_URL}/users/reset-password`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            resetToken,
                            newPassword
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Password reset failed"
                );

            }


            // ==================================
            // SUCCESS
            // ==================================

            setMessage(
                "Password reset successfully! Redirecting to login..."
            );

            setMessageType("success");


            setNewPassword("");
            setConfirmPassword("");


            // ==================================
            // REMOVE OLD AUTHENTICATION
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

            }, 1800);


        } catch (error) {

            setMessage(
                error.message ||
                "Password reset failed"
            );

            setMessageType("error");


        } finally {

            setLoading(false);

        }

    };


    const passwordsMatch =
        confirmPassword.length > 0 &&
        newPassword === confirmPassword;


    const passwordsMismatch =
        confirmPassword.length > 0 &&
        newPassword !== confirmPassword;


    return (

        <main className="reset-page">

            <div className="reset-container">


                {/* ==================================
                    INTRO
                ================================== */}

                <div className="reset-intro">

                    <div className="reset-brand">
                        R
                    </div>

                    <h1>
                        Reset Password
                    </h1>

                    <p>
                        Create a new password for your account
                        to restore access securely.
                    </p>

                </div>


                {/* ==================================
                    RESET CARD
                ================================== */}

                <div className="reset-card">


                    {/* ==================================
                        HEADING
                    ================================== */}

                    <div className="reset-heading">

                        <h2>
                            Create New Password
                        </h2>

                        <p>
                            Enter and confirm your new
                            account password.
                        </p>

                    </div>


                    {/* ==================================
                        INVALID TOKEN
                    ================================== */}

                    {!resetToken && !message && (

                        <div className="reset-message error">

                            This password reset link is invalid.
                            Please request a new reset link.

                        </div>

                    )}


                    {/* ==================================
                        SUCCESS / ERROR MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `reset-message ${messageType}`
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
                            NEW PASSWORD
                        ================================== */}

                        <div className="reset-form-group">

                            <label htmlFor="new-password">

                                New Password

                            </label>


                            <div className="reset-input-wrapper">

                                <input
                                    id="new-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={
                                        loading ||
                                        !resetToken
                                    }
                                    autoComplete="new-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="reset-password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={
                                        loading ||
                                        !resetToken
                                    }
                                >

                                    {showPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>


                            <span className="reset-password-help">

                                Minimum 6 characters

                            </span>

                        </div>


                        {/* ==================================
                            CONFIRM PASSWORD
                        ================================== */}

                        <div className="reset-form-group">

                            <label htmlFor="confirm-password">

                                Confirm New Password

                            </label>


                            <div className="reset-input-wrapper">

                                <input
                                    id="confirm-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Re-enter your new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={
                                        loading ||
                                        !resetToken
                                    }
                                    autoComplete="new-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="reset-password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    disabled={
                                        loading ||
                                        !resetToken
                                    }
                                >

                                    {showConfirmPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>


                            {/* PASSWORD MATCH */}

                            {passwordsMatch && (

                                <span className="reset-match match">

                                    Passwords match

                                </span>

                            )}


                            {passwordsMismatch && (

                                <span className="reset-match mismatch">

                                    Passwords do not match

                                </span>

                            )}

                        </div>


                        {/* ==================================
                            SECURITY INFORMATION
                        ================================== */}

                        <div className="reset-security-box">

                            <strong>
                                Password Security
                            </strong>

                            <p>
                                Use at least 6 characters and
                                avoid reusing passwords from
                                other accounts.
                            </p>

                        </div>


                        {/* ==================================
                            RESET BUTTON
                        ================================== */}

                        <button
                            className="reset-submit"
                            type="submit"
                            disabled={
                                loading ||
                                !resetToken
                            }
                        >

                            {loading ? (

                                <>

                                    <span className="reset-spinner">
                                    </span>

                                    Resetting Password...

                                </>

                            ) : (

                                "Reset Password"

                            )}

                        </button>

                    </form>


                    {/* ==================================
                        FOOTER
                    ================================== */}

                    <div className="reset-footer">

                        <p>
                            Need a new reset link?
                        </p>

                        <Link
                            to="/forgot-password"
                            className="reset-back-link"
                        >
                            Back to Forgot Password
                        </Link>

                    </div>

                </div>

            </div>

        </main>

    );

}


export default ResetPassword;