import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch, API_URL } from "../api/api";
import "./Dashboard.css";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const getProfile = async () => {

            try {

                // =====================================
                // AUTHENTICATED REQUEST
                //
                // authFetch automatically:
                // 1. Adds Bearer access token
                // 2. Detects expired access token
                // 3. Uses refresh-token cookie
                // 4. Gets a new access token
                // 5. Retries this request
                // =====================================

                const response = await authFetch(
                    "/users/profile"
                );


                const data =
                    await response.json();


                console.log(
                    "PROFILE DATA:",
                    data
                );


                console.log(
                    "PROFILE IMAGE:",
                    data.profileImage
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Unable to load profile"
                    );

                }


                setUser(data);


            } catch (error) {

                console.log(error);

                alert(error.message);

            }

        };


        getProfile();

    }, []);


    return (

        <main className="dashboard-page">

            <div className="dashboard-container">

                <h1>
                    Dashboard
                </h1>


                {user ? (

                    /* =====================================
                       PROFILE
                    ===================================== */

                    <div className="profile-card">


                        {/* PROFILE HEADER */}

                        <div className="profile-header">

                            <div className="profile-avatar">

                                {user.profileImage ? (

                                    <img
                                        src={`${API_URL}${user.profileImage.replace("/app", "")}?v=${Date.now()}`}
                                        alt="Profile"
                                    />

                                ) : (

                                    user.name
                                        ?.charAt(0)
                                        .toUpperCase()

                                )}

                            </div>


                            <div>

                                <h2>
                                    Welcome, {user.name}
                                </h2>

                                <p>
                                    Your account information
                                </p>

                            </div>

                        </div>



                        {/* PROFILE INFORMATION */}

                        <div className="profile-info">

                            <div className="info-item">

                                <span>
                                    Name
                                </span>

                                <strong>
                                    {user.name}
                                </strong>

                            </div>


                            <div className="info-item">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    {user.email}
                                </strong>

                            </div>


                            <div className="info-item">

                                <span>
                                    Role
                                </span>

                                <strong>
                                    {user.role}
                                </strong>

                            </div>

                        </div>



                        {/* DASHBOARD ACTIONS */}

                        <div className="dashboard-actions">

                            <Link
                                to="/edit-profile"
                                className="edit-profile-btn"
                            >
                                Edit Profile
                            </Link>


                            <Link
                                to="/change-password"
                                className="edit-profile-btn"
                            >
                                Change Password
                            </Link>


                            <Link
                                to="/upload-profile"
                                className="edit-profile-btn"
                            >
                                Upload Profile Image
                            </Link>

                        </div>

                    </div>

                ) : (

                    /* =====================================
                       SIMPLE LOADING ANIMATION
                    ===================================== */

                    <div className="loading">

                        <div className="loading-spinner">
                        </div>

                        <p>
                            Loading your profile
                        </p>

                        <span>
                            Please wait a moment...
                        </span>

                    </div>

                )}

            </div>

        </main>

    );
}

export default Dashboard;