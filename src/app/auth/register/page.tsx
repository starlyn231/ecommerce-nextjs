"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { AlertDefault } from "@/app/components/alert";
function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            return alert("Passwords do not match");
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });


            if (!res.ok) {
                const { message } = await res.json();
                alert(message)
            } else {
                router.push("/auth/login");
            }
        } catch (error: any) {
            alert("Error catch: " + error.message);
        }
    });



    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
                    <div className="w-full">
                        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
                            Username:
                        </label>
                        <input
                            type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Username is required",
                                },
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                            placeholder="yourUser123"
                        />

                        {errors.username && (
                            <span className="text-red-500 text-xs">
                                {errors.username.message}
                            </span>
                        )}

                        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
                            Email:
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                            placeholder="user@email.com"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs">{errors.email.message}</span>
                        )}

                        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
                            Password:
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required",
                                },
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                            placeholder="********"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}

                        <label
                            htmlFor="confirmPassword"
                            className="text-slate-500 mb-2 block text-sm"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: "Confirm Password is required",
                                },
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                            placeholder="********"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-sm">
                                {errors.confirmPassword.message}
                            </span>
                        )}

                        <button className="w-full bg-[teal] text-white p-3 rounded-lg mt-2">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;