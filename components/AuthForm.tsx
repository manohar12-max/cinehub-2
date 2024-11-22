"use client";
import { FormData } from "@/lib/types";
import { Email, Lock, Person } from "@mui/icons-material";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const AuthForm = ({ hidden = true }: { hidden: boolean }) => {
 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: hidden
      ? { email: "", password: "" }
      : { username: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
 
    let res;
    if (!hidden) {
      try {
        res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          router.push("/login");
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
      } 
    } 
   if (hidden) {
      res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res && res.ok) {
        router.push("/");
      } else {
      toast.error("Invalid credentials");
      }
    }
  };
  return (
    <div className="auth">
      <div className="overlay">
        <div className="content">
          <img src="/images/logo.png" alt="logo" className="logo" />
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            {!hidden && (
              <>
                <div className="input">
                  <input
                    {...register("username", {
                      required: "username is required",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 2) {
                          return "Username must be at least 2 characters";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="input-field"
                  />
                  <Person sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className="error">{errors.username.message}</p>
                )}
              </>
            )}
            <div className="input">
              <input
                {...register("email", {
                  required: "email is required",
                })}
                type="text"
                placeholder="Email"
                className="input-field"
              />
              <Email sx={{ color: "white" }} />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <div className="input">
              <input
                type="password"
                {...register("password", {
                  required: "email is required",
                  validate: (value: string | undefined) => {
                    if (!value || value.length < 4) {
                      return "Password must be at least 4 characters";
                    }
                    return true;
                  },
                })}
                placeholder="Password"
                className="input-field"
              />
              <Lock sx={{ color: "white" }} />
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <button type="submit" className="button">
              {hidden ? "Lets Watch" : "Join Free"}
            </button>
          </form>
          {hidden ? (
            <p className="text-white">
              Dont have an account? click{" "}
              <Link className="underline" href="/register">
                here
              </Link>{" "}
            </p>
          ) : (
            <p className="text-white">
              Have an account? click{" "}
              <Link className="underline" href="/login">
                here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
