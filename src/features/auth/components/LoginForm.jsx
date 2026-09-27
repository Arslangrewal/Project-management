"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/redux/slices/authSlice";
// import { addToast } from "@/redux/slices/toastSlice";
import { toast } from "sonner";

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await dispatch(
  loginUser({
    email: formData.email,
    password: formData.password,
  })
);

if (loginUser.fulfilled.match(result)) {
  toast.success("Logged in successfully.");
  router.push("/dashboard");
  return;
}

toast.error(result.payload || "Login failed.");
setError(result.payload || "Login failed.");

       
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Sign in to continue to your dashboard.
                    </p>
                </div>

                <div className="space-y-4">
                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-500"
                            />
                            Remember me
                        </label>

                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-500 hover:text-blue-700"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        Sign In
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
