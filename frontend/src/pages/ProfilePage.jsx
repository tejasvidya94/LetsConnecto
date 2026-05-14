import React, { useRef, useState } from 'react';

import { Camera, Mail, User, CalendarDays, ShieldCheck } from 'lucide-react';

import { useAuthStore } from '../store/useAuthStore';
import logo from "../../public/noAvatar.png"

const ProfilePage = () => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = async (e) => {

        try {
            const file = e.target.files[0];

            if (!file) return;

            // VALIDATE IMAGE TYPE
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }

            // VALIDATE SIZE
            if (file.size > MAX_FILE_SIZE) {
                alert("Image must be less than 2MB");
                return;
            }
            // PREVIEW IMAGE
            const previewUrl = URL.createObjectURL(file);

            setSelectedImg(previewUrl);

            // CALL STORE FUNCTION
            await updateProfile(file);
        } catch (error) {
            console.log("error in the handleImageUpload func in profilePage", error);
        }
    };

    return (

        <div
            className="
                h-[calc(100vh-64px)]
                overflow-hidden
                bg-base-200

                px-3 py-3
                sm:px-4 sm:py-4
                lg:px-6 lg:py-5
            "
        >

            <div
                className="
                    mx-auto h-full max-w-6xl
                "
            >

                {/* HEADER */}
                <div
                    className="
                        mb-3 flex flex-col
                        items-center justify-center
                        text-center
                    "
                >

                    <h1
                        className="
                            text-2xl lg:text-3xl
                            font-bold tracking-tight
                        "
                    >
                        Profile Settings
                    </h1>

                    <p
                        className="
                            mt-1 text-sm
                            text-base-content/70
                        "
                    >
                        Manage your account information
                    </p>

                </div>

                {/* MAIN GRID */}
                <div
                    className="
                        grid h-[calc(100%-70px)]
                        gap-4
                        lg:grid-cols-[240px_1fr]
                    "
                >

                    {/* LEFT SIDEBAR */}
                    <div
                        className="
                            rounded-3xl border border-base-300
                            bg-base-100/80
                            p-4 lg:p-5
                            shadow-xl backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                flex flex-col items-center
                            "
                        >

                            {/* PROFILE IMAGE */}
                            <div className="relative">

                                <img
                                    src={
                                        selectedImg ||
                                        authUser?.profilePic ||
                                        logo
                                    }
                                    alt="Profile"
                                    className="
                                        h-24 w-24
                                        lg:h-28 lg:w-28
                                        rounded-full
                                        object-cover
                                        border-4 border-primary/20
                                        shadow-xl
                                    "
                                />

                                {/* CAMERA BUTTON */}
                                <button
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={isUpdatingProfile}
                                    className="
                                        absolute bottom-1 right-1
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-full
                                        border border-base-100
                                        bg-primary text-primary-content
                                        shadow-lg

                                        transition-all duration-300

                                        hover:scale-105
                                        active:scale-95
                                    "
                                >

                                    <Camera className="size-4" />

                                </button>

                                {/* INPUT */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                            </div>

                            {/* USER INFO */}
                            <h2
                                className="
                                    mt-4 text-lg
                                    font-bold text-center
                                "
                            >
                                {authUser?.fullName}
                            </h2>

                            <p
                                className="
                                    mt-1 text-xs
                                    text-base-content/60
                                    text-center break-all
                                "
                            >
                                {authUser?.email}
                            </p>

                            {/* STATUS */}
                            <div
                                className="
                                    mt-4 inline-flex items-center gap-2
                                    rounded-full
                                    bg-success/10
                                    px-3 py-1.5
                                    text-xs font-medium
                                    text-success
                                "
                            >

                                <span
                                    className="
                                        h-2 w-2 rounded-full
                                        bg-success
                                    "
                                />

                                Active Account

                            </div>

                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div
                        className="
                            space-y-4
                            overflow-y-auto
                            pr-1
                        "
                    >

                        {/* PERSONAL INFO */}
                        <div
                            className="
                                rounded-3xl border border-base-300
                                bg-base-100/80
                                p-5 lg:p-6
                                shadow-xl backdrop-blur-xl
                            "
                        >

                            {/* HEADER */}
                            <div
                                className="
                                    mb-4 flex items-center gap-3
                                "
                            >

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-2xl
                                        bg-primary/10
                                    "
                                >
                                    <User
                                        className="
                                            size-5 text-primary
                                        "
                                    />
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-lg lg:text-xl
                                            font-bold
                                        "
                                    >
                                        Personal Information
                                    </h3>

                                    <p
                                        className="
                                            text-xs lg:text-sm
                                            text-base-content/60
                                        "
                                    >
                                        Your account details
                                    </p>

                                </div>

                            </div>

                            {/* FORM */}
                            <div className="space-y-4">

                                {/* NAME */}
                                <div className="space-y-2">

                                    <label
                                        className="
                                            text-sm font-medium
                                            text-base-content/70
                                        "
                                    >
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            className="
                                                absolute left-4 top-1/2
                                                size-4 -translate-y-1/2
                                                text-base-content/40
                                            "
                                        />

                                        <input
                                            type="text"
                                            value={authUser?.fullName}
                                            readOnly
                                            className="
                                                input input-bordered
                                                h-11 w-full
                                                rounded-2xl
                                                border-base-300
                                                bg-base-200/50
                                                pl-11
                                                text-sm
                                            "
                                        />

                                    </div>

                                </div>

                                {/* EMAIL */}
                                <div className="space-y-2">

                                    <label
                                        className="
                                            text-sm font-medium
                                            text-base-content/70
                                        "
                                    >
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            className="
                                                absolute left-4 top-1/2
                                                size-4 -translate-y-1/2
                                                text-base-content/40
                                            "
                                        />

                                        <input
                                            type="email"
                                            value={authUser?.email}
                                            readOnly
                                            className="
                                                input input-bordered
                                                h-11 w-full
                                                rounded-2xl
                                                border-base-300
                                                bg-base-200/50
                                                pl-11
                                                text-sm
                                            "
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* ACCOUNT INFO */}
                        <div
                            className="
                                rounded-3xl border border-base-300
                                bg-base-100/80
                                p-5 lg:p-6
                                shadow-xl backdrop-blur-xl
                            "
                        >

                            {/* HEADER */}
                            <div
                                className="
                                    mb-4 flex items-center gap-3
                                "
                            >

                                <div
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        rounded-2xl
                                        bg-success/10
                                    "
                                >
                                    <ShieldCheck
                                        className="
                                            size-5 text-success
                                        "
                                    />
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-lg lg:text-xl
                                            font-bold
                                        "
                                    >
                                        Account Information
                                    </h3>

                                    <p
                                        className="
                                            text-xs lg:text-sm
                                            text-base-content/60
                                        "
                                    >
                                        Status and activity
                                    </p>

                                </div>

                            </div>

                            {/* INFO */}
                            <div
                                className="
                                    divide-y divide-base-300
                                "
                            >

                                {/* MEMBER SINCE */}
                                <div
                                    className="
                                        flex items-center
                                        justify-between py-3
                                    "
                                >

                                    <div
                                        className="
                                            flex items-center gap-3
                                        "
                                    >

                                        <CalendarDays
                                            className="
                                                size-4
                                                text-base-content/50
                                            "
                                        />

                                        <span
                                            className="
                                                text-sm font-medium
                                            "
                                        >
                                            Member Since
                                        </span>

                                    </div>

                                    <span
                                        className="
                                            text-sm text-base-content/70
                                        "
                                    >
                                        {
                                            authUser?.createdAt
                                                ? new Date(
                                                    authUser.createdAt
                                                ).toLocaleDateString()
                                                : "Recently"
                                        }
                                    </span>

                                </div>

                                {/* STATUS */}
                                <div
                                    className="
                                        flex items-center
                                        justify-between py-3
                                    "
                                >

                                    <span
                                        className="
                                            text-sm font-medium
                                        "
                                    >
                                        Account Status
                                    </span>

                                    <div
                                        className="
                                            rounded-full
                                            bg-success/10
                                            px-3 py-1.5
                                            text-xs font-semibold
                                            text-success
                                        "
                                    >
                                        Active
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default ProfilePage;