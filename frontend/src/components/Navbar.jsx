import React from 'react';
import { Link } from 'react-router-dom';
import {
    MessageSquare,
    Settings,
    User,
    LogOut
} from 'lucide-react';

import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {

    const { authUser, logout } = useAuthStore();

    return (

        <header
            className="
                sticky top-0 z-50
                w-full border-b border-base-300/40
                bg-base-100/95 backdrop-blur-lg
            "
        >

            {/* <div
                className="
                    mx-auto flex h-16 max-w-7xl
                    items-center justify-between
                    px-4 sm:px-6 lg:px-8
                "
            > */}
            <div
                className="
      flex h-16 w-full
      items-center justify-between
      px-6 lg:px-10
   "
            >

                {/* LOGO + BRAND */}
                <Link
                    to="/"
                    className="
                        flex items-center gap-3
                        transition-all duration-300
                        hover:opacity-80
                    "
                >

                    {/* LOGO */}
                    <div
                        className="
                            flex h-11 w-11
                            items-center justify-center
                            rounded-2xl
                            bg-primary/10
                            border border-primary/20
                            shadow-lg shadow-primary/5
                        "
                    >
                        <MessageSquare
                            className="
                                h-5 w-5 text-primary
                            "
                        />
                    </div>

                    {/* BRAND NAME */}
                    <h1
                        className="
                            text-xl font-bold
                            tracking-tight
                            text-base-content
                        "
                    >
                        Chatty
                    </h1>

                </Link>

                {/* SHOW OPTIONS ONLY IF AUTHORIZED */}
                {
                    authUser && (

                        <nav
                            className="
                                flex items-center gap-2
                            "
                        >

                            {/* SETTINGS */}
                            <Link
                                to="/settings"
                                className="
                                    btn btn-ghost btn-sm
                                    rounded-xl
                                    gap-2
                                    px-4
                                "
                            >
                                <Settings className="size-4" />

                                <span className="hidden sm:inline">
                                    Settings
                                </span>
                            </Link>

                            {/* PROFILE */}
                            <Link
                                to="/profile"
                                className="
                                    btn btn-ghost btn-sm
                                    rounded-xl
                                    gap-2
                                    px-4
                                "
                            >
                                <User className="size-4" />

                                <span className="hidden sm:inline">
                                    Profile
                                </span>
                            </Link>

                            {/* LOGOUT */}
                            <button
                                onClick={logout}
                                className="
                                    btn btn-ghost btn-sm
                                    rounded-xl
                                    gap-2
                                    px-4
                                    hover:bg-error/10
                                    hover:text-error
                                "
                            >
                                <LogOut className="size-4" />

                                <span className="hidden sm:inline">
                                    Logout
                                </span>
                            </button>

                        </nav>

                    )
                }

            </div>

        </header>

    );
};

export default Navbar;