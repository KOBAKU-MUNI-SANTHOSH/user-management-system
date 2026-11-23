import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authFetch } from "../api/api";
import "./AdminRoute.css";

function AdminRoute({ children }) {

    const [isAdmin, setIsAdmin] = useState(null);


    useEffect(() => {

        const checkAdmin = async () => {

            try {

                // ==========================================
                // CHECK ACCESS TOKEN
                // ==========================================

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    setIsAdmin(false);

                    return;
                }


                // ==========================================
                // CHECK USER PROFILE
                // ==========================================

                const response =
                    await authFetch(
                        "/users/profile"
                    );


                const data =
                    await response.json();


                // ==========================================
                // REQUEST FAILED
                // ==========================================

                if (!response.ok) {

                    console.log(
                        "Admin check failed:",
                        data
                    );

                    setIsAdmin(false);

                    return;
                }


                // ==========================================
                // CHECK ADMIN ROLE
                // ==========================================

                setIsAdmin(
                    data.role === "admin"
                );


            } catch (error) {

                console.error(
                    "Admin verification error:",
                    error
                );


                setIsAdmin(false);

            }

        };


        checkAdmin();

    }, []);



    // ==========================================
    // LOADING ADMIN DASHBOARD
    // ==========================================

    if (isAdmin === null) {

        return (

            <main className="admin-route-loading">

                <div className="admin-route-spinner">
                </div>

                <p>
                    Loading dashboard...
                </p>

            </main>

        );

    }



    // ==========================================
    // NOT ADMIN
    // ==========================================

    if (!isAdmin) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }



    // ==========================================
    // ADMIN VERIFIED
    // ==========================================

    return children;

}


export default AdminRoute;