import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Lock, Mail, MessageSquare, User2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) { return toast.error("Name required"); }
        if (!formData.email.trim()) { return toast.error("Email required"); }
        if (! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { return toast.error("Invalid email format"); }
        if (!formData.password) { return toast.error("Password is required") }
        if (formData.password.length < 6) return toast.error("Password length must be at least 6 characters");
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success === true) signup(formData);
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-base-200">

            {/* LEFT SIDE */}
            <section className="flex items-center justify-center px-6 py-10 sm:px-12">

                <div className="w-full max-w-md">

                    {/* LOGO + HEADING */}
                    <div className="mb-10 text-center">

                        <div className="group flex flex-col items-center gap-3">

                            {/* LOGO */}
                            <div
                                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl bg-primary/10
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:bg-primary/20
                "
                            >
                                <MessageSquare className="h-7 w-7 text-primary" />
                            </div>

                            {/* TEXT */}
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Create Account
                                </h1>

                                <p className="text-sm text-base-content/70">
                                    Join the conversation today
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* FULL NAME */}
                        <div className="space-y-2">

                            <label
                                htmlFor="fullName"
                                className="text-sm font-medium text-base-content/80"
                            >
                                Full Name
                            </label>

                            <div className="relative group">

                                <div
                                    className="
                    pointer-events-none absolute inset-y-0 left-0
                    flex items-center pl-4
                  "
                                >
                                    <User2
                                        className="
                      h-5 w-5 text-base-content/40
                      transition-colors duration-200
                      group-focus-within:text-primary
                    "
                                    />
                                </div>

                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="
                                w-full h-14 pl-12 pr-4
                                rounded-2xl border border-base-300
                                bg-base-100/80 backdrop-blur-sm
                                text-base

                                transition-all duration-300

                                placeholder:text-base-content/40

                                hover:border-primary/40
                                focus:border-primary
                                focus:outline-none
                                focus:ring-4
                                focus:ring-primary/10
                                focus:shadow-lg
                                "
                                />

                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="space-y-2">

                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-base-content/80"
                            >
                                Email Address
                            </label>

                            <div className="relative group">

                                <div
                                    className="
                    pointer-events-none absolute inset-y-0 left-0
                    flex items-center pl-4
                  "
                                >
                                    <Mail
                                        className="
                      h-5 w-5 text-base-content/40
                      transition-colors duration-200
                      group-focus-within:text-primary
                    "
                                    />
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={
                                        //code here
                                        (e) => setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="
                    w-full h-14 pl-12 pr-4
                    rounded-2xl border border-base-300
                    bg-base-100/80 backdrop-blur-sm
                    text-base

                    transition-all duration-300

                    placeholder:text-base-content/40

                    hover:border-primary/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4
                    focus:ring-primary/10
                    focus:shadow-lg
                  "
                                />

                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">

                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-base-content/80"
                            >
                                Password
                            </label>

                            <div className="relative group">

                                {/* LEFT ICON */}
                                <div
                                    className="
            pointer-events-none absolute inset-y-0 left-0
            flex items-center pl-4
          "
                                >
                                    <Lock
                                        className="
              h-5 w-5 text-base-content/40
              transition-colors duration-200
              group-focus-within:text-primary
            "
                                    />
                                </div>

                                {/* INPUT */}
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="
            w-full h-14 pl-12 pr-14
            rounded-2xl border border-base-300
            bg-base-100/80 backdrop-blur-sm
            text-base

            transition-all duration-300

            placeholder:text-base-content/40

            hover:border-primary/40
            focus:border-primary
            focus:outline-none
            focus:ring-4
            focus:ring-primary/10
            focus:shadow-lg
          "
                                />

                                {/* SHOW / HIDE BUTTON */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="
            absolute inset-y-0 right-0
            flex items-center pr-4
            text-base-content/40

            transition-colors duration-200

            hover:text-primary
          "
                                >
                                    {
                                        showPassword
                                            ? <EyeOff className="h-5 w-5" />
                                            : <Eye className="h-5 w-5" />
                                    }
                                </button>

                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="
                btn btn-primary w-full h-14
                rounded-2xl text-base font-semibold
                transition-all duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
                shadow-lg shadow-primary/20
              "
                        >
                            Create Account
                        </button>

                    </form>

                    {/* FOOTER */}
                    <p className="mt-8 text-center text-sm text-base-content/60">
                        Already have an account?{" "}
                        <span className="text-primary font-medium cursor-pointer hover:underline">
                            Sign in
                        </span>
                    </p>

                </div>
            </section>

            {/* RIGHT SIDE */}
            <section
                className="
          hidden lg:flex
          items-center justify-center
          bg-primary/5
          border-l border-base-300
        "
            >

                <div className="max-w-md px-10 text-center">

                    <div
                        className="
              mb-6 inline-flex h-20 w-20
              items-center justify-center
              rounded-3xl bg-primary/10
            "
                    >
                        <MessageSquare className="h-10 w-10 text-primary" />
                    </div>

                    <h2 className="mb-4 text-4xl font-bold tracking-tight">
                        Connect with Everyone
                    </h2>

                    <p className="text-base-content/70 leading-relaxed">
                        Real-time messaging, modern conversations, and seamless
                        communication — all in one beautiful chat platform.
                    </p>

                </div>
            </section>

        </div>
    );
}

export default SignupPage
