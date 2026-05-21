import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Eye, EyeOff, Lock, Mail, MessageSquare } from 'lucide-react';

import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(formData);
  };

  return (

    <div
      className="
                min-h-screen
                grid lg:grid-cols-2
                bg-base-200
            "
    >

      {/* LEFT SIDE */}
      <section
        className="
                    flex items-center justify-center
                    px-6 py-10 sm:px-12
                "
      >

        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="mb-10 text-center">

            <div
              className="
                                flex flex-col items-center gap-4
                            "
            >

              {/* LOGO */}
              <div
                className="
                                    flex h-16 w-16
                                    items-center justify-center
                                    rounded-3xl
                                    bg-primary/10
                                    border border-primary/20
                                    shadow-lg shadow-primary/10
                                "
              >
                <MessageSquare
                  className="
                                        h-8 w-8 text-primary
                                    "
                />
              </div>

              {/* TEXT */}
              <div className="space-y-2">

                <h1
                  className="
                                        text-4xl font-bold
                                        tracking-tight
                                    "
                >
                  Welcome Back
                </h1>

                <p
                  className="
                                        text-base-content/70
                                    "
                >
                  Sign in to continue chatting
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div className="space-y-2">

              <label
                htmlFor="email"
                className="
                                    text-sm font-medium
                                    text-base-content/80
                                "
              >
                Email Address
              </label>

              <div className="relative group">

                {/* ICON */}
                <div
                  className="
                                        pointer-events-none
                                        absolute inset-y-0 left-0
                                        flex items-center pl-4
                                    "
                >
                  <Mail
                    className="
                                            h-5 w-5
                                            text-base-content/40
                                            transition-colors duration-200
                                            group-focus-within:text-primary
                                        "
                  />
                </div>

                {/* INPUT */}
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="
                                        w-full h-14
                                        rounded-2xl
                                        border border-base-300
                                        bg-base-100/80
                                        pl-12 pr-4
                                        text-base

                                        backdrop-blur-sm

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

              <div
                className="
                                    flex items-center
                                    justify-between
                                "
              >

                <label
                  htmlFor="password"
                  className="
                                        text-sm font-medium
                                        text-base-content/80
                                    "
                >
                  Password
                </label>

                <Link
                  to="/forgot-pass"
                  className="
                                        text-sm font-medium
                                        text-primary
                                        hover:underline
                                    "
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative group">

                {/* ICON */}
                <div
                  className="
                                        pointer-events-none
                                        absolute inset-y-0 left-0
                                        flex items-center pl-4
                                    "
                >
                  <Lock
                    className="
                                            h-5 w-5
                                            text-base-content/40
                                            transition-colors duration-200
                                            group-focus-within:text-primary
                                        "
                  />
                </div>

                {/* INPUT */}
                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="
                                        w-full h-14
                                        rounded-2xl
                                        border border-base-300
                                        bg-base-100/80
                                        pl-12 pr-14
                                        text-base

                                        backdrop-blur-sm

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

                {/* TOGGLE BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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
              disabled={isLoggingIn}
              className="
                                btn btn-primary
                                h-14 w-full
                                rounded-2xl
                                text-base font-semibold

                                transition-all duration-300

                                hover:scale-[1.02]
                                active:scale-[0.98]

                                shadow-lg shadow-primary/20
                            "
            >

              {
                isLoggingIn
                  ? (
                    <span
                      className="
                                                loading loading-spinner
                                                loading-sm
                                            "
                    />
                  )
                  : "Sign In"
              }

            </button>

          </form>

          {/* FOOTER */}
          <p
            className="
                            mt-8 text-center text-sm
                            text-base-content/60
                        "
          >
            Don&apos;t have an account?{" "}

            <Link
              to="/signup"
              className="
                                font-medium text-primary
                                hover:underline
                            "
            >
              Create account
            </Link>

          </p>

        </div>

      </section>

      {/* RIGHT SIDE */}
      <section
        className="
                    hidden lg:flex
                    items-center justify-center

                    border-l border-base-300
                    bg-primary/5
                "
      >

        <div
          className="
                        max-w-md px-10 text-center
                    "
        >

          {/* ICON */}
          <div
            className="
                            mb-6 inline-flex
                            h-24 w-24
                            items-center justify-center
                            rounded-4xl
                            bg-primary/10
                            border border-primary/20
                        "
          >
            <MessageSquare
              className="
                                h-12 w-12 text-primary
                            "
            />
          </div>

          {/* TEXT */}
          <h2
            className="
                            mb-4 text-4xl font-bold
                            tracking-tight
                        "
          >
            Stay Connected
          </h2>

          <p
            className="
                            leading-relaxed
                            text-base-content/70
                        "
          >
            Chat with friends, collaborate in real-time,
            and experience seamless communication
            with a modern messaging platform.
          </p>

        </div>

      </section>

    </div>

  );
};

export default LoginPage;