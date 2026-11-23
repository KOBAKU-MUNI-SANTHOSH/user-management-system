const API_URL = import.meta.env.VITE_API_URL;


// ======================================================
// REFRESH ACCESS TOKEN
// ======================================================

const refreshAccessToken = async () => {

    try {

        const response = await fetch(
            `${API_URL}/users/refresh`,
            {
                method: "POST",

                // IMPORTANT:
                // Allows browser to send HttpOnly
                // refresh-token cookie
                credentials: "include"
            }
        );


        if (!response.ok) {

            localStorage.removeItem("token");

            return null;

        }


        const data =
            await response.json();


        if (!data.token) {

            localStorage.removeItem("token");

            return null;

        }


        // Store new access token

        localStorage.setItem(
            "token",
            data.token
        );


        return data.token;


    } catch (error) {

        console.error(
            "Token refresh failed:",
            error
        );


        localStorage.removeItem("token");

        return null;

    }

};


// ======================================================
// AUTHENTICATED FETCH
// ======================================================

const authFetch = async (
    endpoint,
    options = {}
) => {

    // Get current access token

    let token =
        localStorage.getItem("token");


    // ==============================================
    // PREPARE HEADERS
    // ==============================================

    const headers = {
        ...(options.headers || {})
    };


    // Attach access token

    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }


    // ==============================================
    // FIRST API REQUEST
    // ==============================================

    let response = await fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,

            headers,

            credentials: "include"
        }
    );


    // ==============================================
    // ACCESS TOKEN EXPIRED?
    // ==============================================

    if (response.status === 401) {

        let errorData = {};

        try {

            errorData =
                await response.clone().json();

        } catch {

            errorData = {};

        }


        // Only refresh when the backend explicitly
        // says the ACCESS TOKEN expired.

        if (
            errorData.code ===
            "TOKEN_EXPIRED"
        ) {

            const newToken =
                await refreshAccessToken();


            // ======================================
            // REFRESH TOKEN ALSO FAILED
            // ======================================

            if (!newToken) {

                localStorage.removeItem(
                    "token"
                );


                return response;

            }


            // ======================================
            // RETRY ORIGINAL REQUEST
            // ======================================

            const retryHeaders = {
                ...(options.headers || {}),

                Authorization:
                    `Bearer ${newToken}`
            };


            response = await fetch(
                `${API_URL}${endpoint}`,
                {
                    ...options,

                    headers:
                        retryHeaders,

                    credentials:
                        "include"
                }
            );

        }

    }


    return response;

};


// ======================================================
// LOGOUT
// ======================================================

const logoutUser = async () => {

    try {

        await fetch(
            `${API_URL}/users/logout`,
            {
                method: "POST",

                credentials:
                    "include"
            }
        );

    } catch (error) {

        console.error(
            "Logout request failed:",
            error
        );

    } finally {

        // Always remove access token

        localStorage.removeItem(
            "token"
        );

    }

};


// ======================================================
// EXPORTS
// ======================================================

export {
    API_URL,
    authFetch,
    refreshAccessToken,
    logoutUser
};