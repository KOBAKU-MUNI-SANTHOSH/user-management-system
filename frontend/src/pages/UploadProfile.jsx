import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";
import "./UploadProfile.css";


function UploadProfile() {

    const [image, setImage] =
        useState(null);

    const [preview, setPreview] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");


    const fileInputRef =
        useRef(null);

    const navigate =
        useNavigate();


    // ==========================================
    // IMAGE PREVIEW
    // ==========================================

    useEffect(() => {

        if (!image) {

            setPreview("");

            return;

        }


        const objectUrl =
            URL.createObjectURL(image);


        setPreview(objectUrl);


        return () => {

            URL.revokeObjectURL(
                objectUrl
            );

        };

    }, [image]);


    // ==========================================
    // IMAGE SELECTION
    // ==========================================

    const handleImageChange = (e) => {

        const selectedFile =
            e.target.files?.[0];


        setMessage("");
        setMessageType("");


        if (!selectedFile) {

            return;

        }


        // ======================================
        // FILE TYPE CHECK
        // ======================================

        if (
            !selectedFile.type.startsWith(
                "image/"
            )
        ) {

            setImage(null);

            setMessage(
                "Please select a valid image file."
            );

            setMessageType(
                "error"
            );

            return;

        }


        // ======================================
        // FILE SIZE CHECK
        // MAXIMUM 5 MB
        // ======================================

        if (
            selectedFile.size >
            5 * 1024 * 1024
        ) {

            setImage(null);

            setMessage(
                "Image must be smaller than 5 MB."
            );

            setMessageType(
                "error"
            );

            return;

        }


        setImage(
            selectedFile
        );

    };


    // ==========================================
    // REMOVE SELECTED IMAGE
    // ==========================================

    const removeImage = () => {

        setImage(null);

        setMessage("");
        setMessageType("");


        if (fileInputRef.current) {

            fileInputRef.current.value =
                "";

        }

    };


    // ==========================================
    // UPLOAD IMAGE
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!image) {

            setMessage(
                "Please select a profile image first."
            );

            setMessageType(
                "error"
            );

            return;

        }


        try {

            setLoading(true);

            setMessage("");
            setMessageType("");


            // ======================================
            // CREATE FORM DATA
            // ======================================

            const formData =
                new FormData();


            formData.append(
                "profile",
                image
            );


            // ======================================
            // AUTHENTICATED IMAGE UPLOAD
            // ======================================

            const response =
                await authFetch(
                    "/users/upload",
                    {
                        method: "POST",

                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Image upload failed"
                );

            }


            // ======================================
            // SUCCESS
            // ======================================

            setMessage(
                "Profile image uploaded successfully."
            );

            setMessageType(
                "success"
            );


            setTimeout(() => {

                navigate(
                    "/dashboard"
                );

            }, 1200);


        } catch (error) {

            setMessage(
                error.message ||
                "Image upload failed"
            );

            setMessageType(
                "error"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <main className="upload-profile-page">

            <div className="upload-profile-container">


                {/* ==================================
                    INTRO
                ================================== */}

                <div className="upload-profile-intro">

                    <div className="upload-profile-brand">
                        P
                    </div>

                    <h1>
                        Profile Image
                    </h1>

                    <p>
                        Upload an image to personalize
                        your account.
                    </p>

                </div>


                {/* ==================================
                    CARD
                ================================== */}

                <div className="upload-profile-card">


                    {/* ==================================
                        HEADING
                    ================================== */}

                    <div className="upload-profile-heading">

                        <h2>
                            Upload Profile Image
                        </h2>

                        <p>
                            Choose a JPG, PNG or WEBP image
                            from your device.
                        </p>

                    </div>


                    {/* ==================================
                        MESSAGE
                    ================================== */}

                    {message && (

                        <div
                            className={
                                `upload-message ${messageType}`
                            }
                        >

                            {message}

                        </div>

                    )}


                    <form onSubmit={handleSubmit}>


                        {/* ==================================
                            IMAGE UPLOAD AREA
                        ================================== */}

                        <div
                            className={
                                preview
                                    ? "upload-area has-image"
                                    : "upload-area"
                            }

                            onClick={() => {

                                if (!loading) {

                                    fileInputRef.current
                                        ?.click();

                                }

                            }}
                        >


                            <input
                                ref={fileInputRef}
                                className="upload-file-input"
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                disabled={loading}
                            />


                            {preview ? (

                                <div className="upload-preview">


                                    <div className="upload-preview-image">

                                        <img
                                            src={preview}
                                            alt="Profile preview"
                                        />

                                    </div>


                                    <div className="upload-preview-info">

                                        <strong>
                                            {image.name}
                                        </strong>

                                        <span>

                                            {(
                                                image.size /
                                                (1024 * 1024)
                                            ).toFixed(2)} MB

                                        </span>

                                    </div>


                                    <p>
                                        Click here to choose
                                        another image
                                    </p>

                                </div>

                            ) : (

                                <div className="upload-placeholder">


                                    <div className="upload-symbol">
                                        +
                                    </div>


                                    <strong>
                                        Choose Profile Image
                                    </strong>


                                    <p>
                                        Click here to browse
                                        your files
                                    </p>


                                    <span>
                                        JPG, PNG, WEBP · Maximum 5 MB
                                    </span>

                                </div>

                            )}

                        </div>


                        {/* ==================================
                            REMOVE IMAGE
                        ================================== */}

                        {image && (

                            <button
                                type="button"
                                className="remove-image-btn"
                                onClick={
                                    removeImage
                                }
                                disabled={loading}
                            >

                                Remove Selected Image

                            </button>

                        )}


                        {/* ==================================
                            INFORMATION
                        ================================== */}

                        <div className="upload-info-box">

                            <strong>
                                Secure profile upload
                            </strong>

                            <p>
                                Your authenticated session is
                                used to update your profile image.
                            </p>

                        </div>


                        {/* ==================================
                            UPLOAD
                        ================================== */}

                        <button
                            className="upload-profile-submit"
                            type="submit"
                            disabled={
                                loading ||
                                !image
                            }
                        >

                            {loading ? (

                                <>

                                    <span className="upload-spinner">
                                    </span>

                                    Uploading Image...

                                </>

                            ) : (

                                "Upload Profile Image"

                            )}

                        </button>


                        {/* ==================================
                            CANCEL
                        ================================== */}

                        <button
                            className="upload-profile-cancel"
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                navigate(
                                    "/dashboard"
                                )
                            }
                        >

                            Back to Dashboard

                        </button>

                    </form>

                </div>

            </div>

        </main>

    );

}


export default UploadProfile;