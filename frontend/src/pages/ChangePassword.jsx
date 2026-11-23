import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import "./ChangePassword.css";

function ChangePassword() {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");


        // ======================================
        // CHECK PASSWORD MATCH
        // ======================================

        if (newPassword !== confirmPassword) {

            setMessage(
                "New passwords do not match."
            );

            setMessageType("error");

            return;
        }


        // ======================================
        // PASSWORD LENGTH
        // ======================================

        if (newPassword.length < 6) {

            setMessage(
                "New password must contain at least 6 characters."
            );

            setMessageType("error");

            return;
        }


        try {

            setLoading(true);


            // ======================================
            // CHANGE PASSWORD REQUEST
            // ======================================

            const response = await authFetch(
                "/users/change-password",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        oldPassword:
                            currentPassword,

                        newPassword
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
                    "Password change failed"
                );
            }


            // ======================================
            // SUCCESS
            // ======================================

            setMessage(
                "Password changed successfully."
            );

            setMessageType("success");


            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");


            // ======================================
            // RETURN TO DASHBOARD
            // ======================================

            setTimeout(() => {

                navigate(
                    "/dashboard",
                    {
                        replace: true
                    }
                );

            }, 1200);


        } catch (error) {

            setMessage(
                error.message ||
                "Password change failed"
            );

            setMessageType("error");


        } finally {

            setLoading(false);
        }

    };


    return (

        <main className="change-password-page">

            <div className="change-password-container">


                {/* ==================================
                    PAGE INTRO
                ================================== */}

                <div className="change-password-intro">

                    <div className="change-password-brand">
                        P
                    </div>

                    <h1>
                        Change Password
                    </h1>

                    <p>
                        Update your account password
                        to keep your account secure.
                    </p>

                </div>


                {/* ==================================
                    CARD
                ================================== */}

                <div className="change-password-card">


                    <div className="change-password-heading">

                        <h2>
                            Update Password
                        </h2>

                        <p>
                            Enter your current password
                            and choose a new one.
                        </p>

                    </div>


                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `change-password-message ${messageType}`
                            }
                        >
                            {message}
                        </div>

                    )}


                    {/* ==================================
                        FORM
                    ================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* CURRENT PASSWORD */}

                        <div className="change-password-group">

                            <label htmlFor="current-password">

                                Current Password

                            </label>


                            <div className="change-password-input">

                                <input
                                    id="current-password"
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                    autoComplete="current-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-visibility-btn"
                                    onClick={() =>
                                        setShowCurrentPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    disabled={loading}
                                >

                                    {showCurrentPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>

                        </div>


                        {/* NEW PASSWORD */}

                        <div className="change-password-group">

                            <label htmlFor="new-password">

                                New Password

                            </label>


                            <div className="change-password-input">

                                <input
                                    id="new-password"
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    disabled={loading}
                                    autoComplete="new-password"
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-visibility-btn"
                                    onClick={() =>
                                        setShowNewPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    disabled={loading}
                                >

                                    {showNewPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="change-password-group">

                            <label htmlFor="confirm-new-password">

                                Confirm New Password

                            </label>


                            <div className="change-password-input">

                                <input
                                    id="confirm-new-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Re-enter new password"
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


                                <button
                                    type="button"
                                    className="password-visibility-btn"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (current) =>
                                                !current
                                        )
                                    }
                                    disabled={loading}
                                >

                                    {showConfirmPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>


                            {/* PASSWORD MATCH */}

                            {confirmPassword && (

                                <span
                                    className={
                                        newPassword ===
                                        confirmPassword
                                            ? "password-match-status match"
                                            : "password-match-status mismatch"
                                    }
                                >

                                    {newPassword ===
                                    confirmPassword
                                        ? "Passwords match"
                                        : "Passwords do not match"}

                                </span>

                            )}

                        </div>


                        {/* ==================================
                            SECURITY INFORMATION
                        ================================== */}

                        <div className="password-security-box">

                            <strong>
                                Security recommendation
                            </strong>

                            <p>
                                Use at least 6 characters
                                and avoid reusing passwords
                                from other accounts.
                            </p>

                        </div>


                        {/* ==================================
                            ACTIONS
                        ================================== */}

                        <div className="change-password-actions">

                            <button
                                className="change-password-submit"
                                type="submit"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>

                                        <span className="password-spinner">
                                        </span>

                                        Updating Password...

                                    </>

                                ) : (

                                    "Change Password"

                                )}

                            </button>


                            <button
                                className="change-password-cancel"
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                            >

                                Cancel

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </main>

    );
}


export default ChangePassword;