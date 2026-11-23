import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {

    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    const token =
        localStorage.getItem("token");


    // ==========================================
    // ALREADY LOGGED IN
    // ==========================================

    if (token) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    return children;

}


export default PublicRoute;