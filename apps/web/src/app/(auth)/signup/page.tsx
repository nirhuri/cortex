"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/actions/auth.actions";

type SignupForm = {
  email: string;
  password: string;
  fullName: string;
};

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    try {
      await registerAction(data);
      router.push("/dashboard");
    } catch (error) {
      setError("root", { message: "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-background rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:flex flex-col items-center justify-center bg-slate-800 text-slate-100 p-10">
          <h2 className="text-3xl font-semibold mb-4 text-slate-50">
            Join Cortex Today! 🚀
          </h2>
          <p className="text-lg text-slate-300 max-w-sm text-center">
            Create your account and start your journey with us.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold mb-6">Create Your Account</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              errors.email || errors.password || errors.fullName
                ? "space-y-1"
                : "space-y-6"
            }
          >
            <label
              htmlFor="fullName"
              className="block text-sm text-gray-500 font-medium mb-1 pl-1"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="fullName"
              placeholder="John Doe"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.fullName.message}
              </p>
            )}

            <label
              htmlFor="email"
              className="block text-sm text-gray-500 font-medium mb-1 pl-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.email.message}
              </p>
            )}

            <label
              htmlFor="password"
              className="block text-sm text-gray-500 font-medium mb-1 pl-1"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 pl-1">
                {errors.password.message}
              </p>
            )}

            <Button type="submit" className="w-full mt-4">
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
