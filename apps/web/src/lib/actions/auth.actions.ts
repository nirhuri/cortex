"use server";

import { LoginDto, SignupDto } from "@/types/auth.dto";
import { login, signup } from "../api/auth.api";
import { cookies } from "next/headers";

export async function loginAction(formData: LoginDto) {
  try {
    console.log("🔄 Sending login request...", formData);
    const response = await login(formData);

    console.log("✅ Login response received:", response);
    console.log(
      "🔑 Access token:",
      response.accessToken ? "Present" : "Missing"
    );

    const { accessToken } = response;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // week in seconds
    });

    console.log("🍪 Cookie set successfully");
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
}

export async function registerAction(formData: SignupDto) {
  try {
    console.log("🔄 Sending signup request...", formData);
    const response = await signup(formData);

    console.log("✅ Signup response received:", response);
    console.log(
      "🔑 Access token:",
      response.accessToken ? "Present" : "Missing"
    );

    const { accessToken } = response;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log("🍪 Cookie set successfully");
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw new Error(
      "Registration failed. Please check your details and try again."
    );
  }
}
