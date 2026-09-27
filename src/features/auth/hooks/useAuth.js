"use client";

import { useDispatch } from "react-redux";
import { signOut } from "next-auth/react";

import { clearAuth } from "@/redux/slices/authSlice";
import { removeFromStorage } from "../services/storageService";

export const useAuth = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    removeFromStorage("auth");

    dispatch(clearAuth());

    await signOut({
      callbackUrl: "/login",
    });
  };

  return {
    logout,
  };
};
