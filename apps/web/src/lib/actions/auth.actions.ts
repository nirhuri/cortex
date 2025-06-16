"use server";

import { LoginDto, SignupDto } from "@/types/auth.dto";
import { login, signup } from "../api/auth.api";
import { cookies } from "next/headers";

export async function loginAction(formData: LoginDto) {
  try {
    const response = await login(formData);
    const { accessToken } = response;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // week in seconds
    });
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
}

export async function registerAction(formData: SignupDto) {
  try {
    const response = await signup(formData);

    const { accessToken } = response;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw new Error(
      "Registration failed. Please check your details and try again."
    );
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
  } catch (error) {
    console.error("❌ Logout failed:", error);
    throw new Error("Logout failed. Please try again.");
  }
}
