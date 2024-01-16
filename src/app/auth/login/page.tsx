'use client';
import { useForm } from 'react-hook-form';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { roboto } from '@/app/util/fonts';
import {
    ArrowRightIcon,
    AtSymbolIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/components/buttons';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
// Define a type for the response of the signIn function
type MySignInResponse = SignInResponse | undefined;
function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const router = useRouter();
    const [error, setError] = useState<string | null | undefined>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        const res: MySignInResponse = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            setError(res?.error);
            setLoading(false);
        } else {
            router.push('/views/home');
            router.refresh();
        }
    });

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${roboto.className} mb-3 text-2xl`}>
                    Please log in to continue.
                </h1>
                <div className="w-full">
                    {error && (
                        <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
                            {error}
                        </p>
                    )}

                    <div className="mt-4">
                        <label
                            htmlFor="email"
                            className="text-slate-500 mb-2 block text-sm"
                        >
                            Email:
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: 'Email is required',
                                    },
                                })}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="user@email.com"
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.email && (
                            <span className="text-red-500 text-xs">
                                {errors.email.message}
                            </span>
                        )}
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="text-slate-500 mb-2 block text-sm"
                        >
                            Password:
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required',
                                    },
                                })}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="******"
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <button disabled={loading} className="w-full bg-[teal] text-white p-3 rounded-lg mt-2">

                        {loading ? (<div className='flex justify-center p-2' > <IconLoading /></div>) : <> Log in</>}
                    </button>
                    {/*  <LoginButton loading={loading} /> */}
                </div>
                <div className='flex justify-center hover:underline mt-4'>
                    <Link href="/auth/register">Create acount</Link>
                </div>
            </div>


        </form>
    );
}
export default LoginPage;
function IconLoading() {
    return (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}
function LoginButton(loading: boolean) {

    return (
        <Button status={loading} className="w-full bg-[teal] text-white p-3 rounded-lg mt-2" /* aria-disabled={pending} */ >
            {!loading ? (
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <>
                    Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </>
            )}
        </Button>
    );
}
