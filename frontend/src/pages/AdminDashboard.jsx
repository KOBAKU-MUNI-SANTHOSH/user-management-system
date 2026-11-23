import { useEffect, useState } from "react";
import { authFetch } from "../api/api";
import "./AdminDashboard.css";


function AdminDashboard() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [pageLoading, setPageLoading] = useState(true);

    const [usersLoaded, setUsersLoaded] = useState(false);

    const [error, setError] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deleting, setDeleting] = useState(false);

    const [deleteSuccess, setDeleteSuccess] = useState(false);



    /* =====================================================
       SIMPLE PAGE LOADING
    ===================================================== */

    useEffect(() => {

        const timer = setTimeout(() => {

            setPageLoading(false);

        }, 500);


        return () => {

            clearTimeout(timer);

        };

    }, []);



    /* =====================================================
       GET ALL USERS
    ===================================================== */

    const getAllUsers = async () => {

        try {

            setLoading(true);

            setError("");


            const response = await authFetch(
                "/users/all"
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to fetch users"
                );

            }


            const userList = Array.isArray(data)
                ? data
                : data.users || [];


            setUsers(userList);

            setUsersLoaded(true);


        } catch (error) {

            console.log(error);


            setError(
                error.message ||
                "Failed to fetch users"
            );


        } finally {

            setLoading(false);

        }

    };



    /* =====================================================
       CHANGE USER ROLE
    ===================================================== */

    const changeRole = async (user) => {

        try {

            const newRole =
                user.role === "admin"
                    ? "user"
                    : "admin";


            const response = await authFetch(
                `/users/role/${user._id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        role: newRole
                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to update role"
                );

            }


            alert(
                `User role changed to ${newRole} successfully!`
            );


            await getAllUsers();


        } catch (error) {

            console.log(error);


            alert(
                error.message ||
                "Failed to update role"
            );

        }

    };



    /* =====================================================
       OPEN DELETE MODAL
    ===================================================== */

    const openDeleteModal = (user) => {

        setSelectedUser(user);

        setDeleteSuccess(false);

        setShowDeleteModal(true);

    };



    /* =====================================================
       CLOSE DELETE MODAL
    ===================================================== */

    const closeDeleteModal = () => {

        if (deleting) {
            return;
        }


        setShowDeleteModal(false);

        setSelectedUser(null);

        setDeleteSuccess(false);

    };



    /* =====================================================
       DELETE USER
    ===================================================== */

    const deleteUser = async () => {

        if (!selectedUser) {
            return;
        }


        try {

            setDeleting(true);


            const response = await authFetch(
                `/users/${selectedUser._id}`,
                {
                    method: "DELETE"
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to delete user"
                );

            }


            setUsers((currentUsers) =>

                currentUsers.filter(
                    (user) =>
                        user._id !==
                        selectedUser._id
                )

            );


            setDeleteSuccess(true);

            setDeleting(false);


            setTimeout(() => {

                setShowDeleteModal(false);

                setSelectedUser(null);

                setDeleteSuccess(false);

            }, 1200);


        } catch (error) {

            console.log(error);


            setDeleting(false);


            alert(
                error.message ||
                "Failed to delete user"
            );

        }

    };



    /* =====================================================
       PAGE LOADING
    ===================================================== */

    if (pageLoading) {

        return (

            <main className="admin-page-loading">

                <div className="admin-access-spinner">
                </div>

                <p>
                    Loading dashboard...
                </p>

            </main>

        );

    }



    /* =====================================================
       ADMIN DASHBOARD
    ===================================================== */

    return (

        <main className="admin-page">

            <div className="admin-container">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div className="admin-header">

                    <div>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Administrator Control Panel
                        </p>

                    </div>


                    {usersLoaded && (

                        <div className="user-count">

                            <span>
                                Total Users
                            </span>

                            <strong>
                                {users.length}
                            </strong>

                        </div>

                    )}

                </div>



                {/* =====================================
                    USER MANAGEMENT
                ===================================== */}

                <div className="admin-welcome">

                    <div>

                        <h2>
                            User Management
                        </h2>

                        <p>
                            View registered users, manage roles
                            and remove user accounts.
                        </p>

                    </div>

                </div>



                {/* =====================================
                    CONTROLS
                ===================================== */}

                <div className="admin-controls">

                    <button
                        className="get-users-btn"
                        onClick={getAllUsers}
                        disabled={loading}
                    >

                        {loading ? (

                            <>

                                <span className="admin-spinner">
                                </span>

                                Loading Users...

                            </>

                        ) : (

                            "Get All Users"

                        )}

                    </button>

                </div>



                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="admin-error">

                        {error}

                    </div>

                )}



                {/* =====================================
                    USERS TABLE
                ===================================== */}

                {usersLoaded && !loading && (

                    <div className="table-container">

                        {users.length > 0 ? (

                            <table className="users-table">

                                <thead>

                                    <tr>

                                        <th>
                                            User
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((user) => (

                                        <tr key={user._id}>


                                            {/* USER */}

                                            <td>

                                                <div className="admin-user-info">

                                                    <div className="admin-user-avatar">

                                                        {user.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}

                                                    </div>


                                                    <strong>
                                                        {user.name}
                                                    </strong>

                                                </div>

                                            </td>



                                            {/* EMAIL */}

                                            <td className="admin-email">

                                                {user.email}

                                            </td>



                                            {/* ROLE */}

                                            <td>

                                                <span
                                                    className={
                                                        `role-badge ${user.role}`
                                                    }
                                                >

                                                    {user.role === "admin"
                                                        ? "Admin"
                                                        : "User"}

                                                </span>

                                            </td>



                                            {/* ACTIONS */}

                                            <td>

                                                <div className="admin-actions">

                                                    <button
                                                        className={
                                                            user.role === "admin"
                                                                ? "role-btn make-user-btn"
                                                                : "role-btn make-admin-btn"
                                                        }

                                                        onClick={() =>
                                                            changeRole(user)
                                                        }
                                                    >

                                                        {user.role === "admin"
                                                            ? "Make User"
                                                            : "Make Admin"}

                                                    </button>


                                                    <button
                                                        className="delete-btn"

                                                        onClick={() =>
                                                            openDeleteModal(user)
                                                        }
                                                    >

                                                        Delete

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        ) : (

                            <div className="no-users">

                                <h3>
                                    No users found
                                </h3>

                                <p>
                                    There are currently no registered users.
                                </p>

                            </div>

                        )}

                    </div>

                )}

            </div>



            {/* =========================================
                DELETE MODAL
            ========================================= */}

            {showDeleteModal && selectedUser && (

                <div
                    className="delete-modal-overlay"

                    onClick={closeDeleteModal}
                >

                    <div
                        className="delete-modal"

                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {!deleteSuccess ? (

                            <>


                                {/* WARNING / LOADING */}

                                <div className="delete-warning-icon">

                                    {deleting ? (

                                        <span className="delete-spinner">
                                        </span>

                                    ) : (

                                        "!"

                                    )}

                                </div>



                                {/* TITLE */}

                                <div className="delete-modal-heading">

                                    <span>
                                        DESTRUCTIVE ACTION
                                    </span>


                                    <h2>

                                        {deleting
                                            ? "Deleting User..."
                                            : "Delete User?"}

                                    </h2>


                                    <p>

                                        {deleting
                                            ? "Please wait while the account is being removed."
                                            : "Are you sure you want to permanently delete this user?"}

                                    </p>

                                </div>



                                {/* SELECTED USER */}

                                <div className="delete-user-card">

                                    <div className="delete-user-avatar">

                                        {selectedUser.name
                                            ?.charAt(0)
                                            .toUpperCase()}

                                    </div>


                                    <div>

                                        <strong>
                                            {selectedUser.name}
                                        </strong>

                                        <span>
                                            {selectedUser.email}
                                        </span>

                                    </div>


                                    <span
                                        className={
                                            `delete-user-role ${selectedUser.role}`
                                        }
                                    >

                                        {selectedUser.role}

                                    </span>

                                </div>



                                {/* WARNING */}

                                <div className="delete-warning-box">

                                    <div>

                                        <strong>
                                            This action cannot be undone
                                        </strong>

                                        <p>
                                            The user's account and access
                                            will be permanently removed.
                                        </p>

                                    </div>

                                </div>



                                {/* ACTIONS */}

                                <div className="delete-modal-actions">

                                    <button
                                        className="delete-cancel-btn"

                                        onClick={closeDeleteModal}

                                        disabled={deleting}
                                    >

                                        Cancel

                                    </button>


                                    <button
                                        className="delete-confirm-btn"

                                        onClick={deleteUser}

                                        disabled={deleting}
                                    >

                                        {deleting ? (

                                            <>

                                                <span className="small-delete-spinner">
                                                </span>

                                                Deleting...

                                            </>

                                        ) : (

                                            "Delete User"

                                        )}

                                    </button>

                                </div>

                            </>

                        ) : (


                            /* ==========================
                               SUCCESS
                            ========================== */

                            <div className="delete-success">

                                <span className="delete-success-label">
                                    ACCOUNT REMOVED
                                </span>


                                <h2>
                                    User Deleted
                                </h2>


                                <p>

                                    <strong>
                                        {selectedUser.name}
                                    </strong>{" "}

                                    has been successfully removed.

                                </p>


                                <div className="delete-success-progress">

                                    <div>
                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </main>

    );

}


export default AdminDashboard;