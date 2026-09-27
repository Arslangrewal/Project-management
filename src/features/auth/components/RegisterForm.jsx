"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
    validateEmail,
    validatePassword,
    validateName,
} from "../../../utils/validators";
import Link from "next/link";
import { registerUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";

export default function RegisterForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateName(formData.name)) {
            setError("Name must be at least 2 characters");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Invalid email");
            return;
        }

        const passwordValidation = validatePassword(formData.password);

        if (!passwordValidation.isValid) {
            const errors = [];   // <-- array

            if (!passwordValidation.checks.minLength)
                errors.push("Password must be at least 8 characters.");

            if (!passwordValidation.checks.maxLength)
                errors.push("Password must not exceed 20 characters.");

            if (!passwordValidation.checks.uppercase)
                errors.push("Include one uppercase letter (A-Z).");

            if (!passwordValidation.checks.lowercase)
                errors.push("Include one lowercase letter (a-z).");

            if (!passwordValidation.checks.number)
                errors.push("Include one number (0-9).");

            if (!passwordValidation.checks.special)
                errors.push("Include one special character (@$!%*?&).");

            setError(errors.join(" "));
            return;
        }



        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = await dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(result)) {

           toast.success("Account created successfully.");

            router.push("/dashboard");

            return;
        }

        setError(result.payload || "Registration failed");
        toast.error(result.payload || "Registration failed.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Join us today and get started.
                    </p>
                </div>

                <div className="space-y-4">
                    {error && (
                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    />

                    <button
                        type="submit"
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition duration-200"
                    >
                        Create Account
                    </button>

                    <div className="text-end">
                        <Link href={'/login'}
                            className="text-blue-400 hover:text-blue-600">Login your account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
