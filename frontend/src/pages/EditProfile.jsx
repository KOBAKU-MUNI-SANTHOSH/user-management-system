import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import "./EditProfile.css";

function EditProfile() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setMessage("");
            setMessageType("");


            // ======================================
            // AUTHENTICATED PROFILE UPDATE
            // ======================================

            const response = await authFetch(
                "/users/update",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
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
                    "Profile update failed"
                );

            }


            // ======================================
            // SUCCESS
            // ======================================

            setMessage(
                "Profile updated successfully."
            );

            setMessageType(
                "success"
            );


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

            }, 1000);


        } catch (error) {

            setMessage(
                error.message ||
                "Something went wrong"
            );

            setMessageType(
                "error"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="edit-profile-page">

            <div className="edit-profile-container">


                {/* ==================================
                    PAGE INTRO
                ================================== */}

                <div className="edit-profile-intro">

                    <div className="edit-profile-brand">
                        E
                    </div>

                    <h1>
                        Edit Profile
                    </h1>

                    <p>
                        Update your personal account
                        information.
                    </p>

                </div>


                {/* ==================================
                    CARD
                ================================== */}

                <div className="edit-profile-card">


                    {/* ==================================
                        HEADING
                    ================================== */}

                    <div className="edit-profile-heading">

                        <h2>
                            Profile Information
                        </h2>

                        <p>
                            Update your name and email
                            address below.
                        </p>

                    </div>


                    {/* ==================================
                        SUCCESS / ERROR
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `edit-profile-message ${messageType}`
                            }
                        >

                            {message}

                        </div>

                    )}


                    {/* ==================================
                        FORM
                    ================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* NAME */}

                        <div className="edit-profile-group">

                            <label htmlFor="edit-name">

                                Name

                            </label>


                            <div className="edit-profile-input">

                                <input
                                    id="edit-name"
                                    type="text"
                                    placeholder="Enter your name"
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

                        </div>


                        {/* EMAIL */}

                        <div className="edit-profile-group">

                            <label htmlFor="edit-email">

                                Email Address

                            </label>


                            <div className="edit-profile-input">

                                <input
                                    id="edit-email"
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

                        </div>


                        {/* ==================================
                            INFORMATION
                        ================================== */}

                        <div className="edit-profile-info">

                            <strong>
                                Secure profile update
                            </strong>

                            <p>
                                Your changes require an
                                authenticated session.
                            </p>

                        </div>


                        {/* ==================================
                            ACTIONS
                        ================================== */}

                        <div className="edit-profile-actions">

                            <button
                                type="submit"
                                className="edit-profile-submit"
                                disabled={loading}
                            >

                                {loading ? (

                                    <>

                                        <span className="edit-spinner">
                                        </span>

                                        Updating Profile...

                                    </>

                                ) : (

                                    "Save Changes"

                                )}

                            </button>


                            <button
                                type="button"
                                className="edit-profile-cancel"
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                                disabled={loading}
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


export default EditProfile;