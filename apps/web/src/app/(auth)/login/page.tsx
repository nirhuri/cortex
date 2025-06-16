"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/lib/actions/auth.actions";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginAction(data);
      router.push("/dashboard");
    } catch (error) {
      setError("root", { message: "Login failed" });
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="grid md:grid-cols-2 w-full max-w-4xl bg-background rounded-2xl shadow-xl overflow-hidden">
        <div className="hidden md:flex flex-col items-center justify-center bg-primary text-primary-foreground p-10">
          <h2 className="text-3xl font-semibold mb-4">Welcome Back 👋</h2>
          <p className="text-lg text-muted-foreground/80 max-w-sm text-center">
            Log in to your account and continue where you left off.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold mb-6">Login to Your Account</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={
              errors.email || errors.password ? "space-y-0.5" : "space-y-3"
            }
          >
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
            <div className="pt-4">
              <Button type="submit" className="w-full mt-4">
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </div>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
