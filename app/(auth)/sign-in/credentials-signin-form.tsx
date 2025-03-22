'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValue } from "@/lib/constants";
import Link from "next/link";
import { signInWithCredentials, signInWithFacebook, signInWithGoogle } from '@/lib/actions/user.actions';
import { useActionState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";


const CredentialsSignInForm = () => {

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    })

    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isPendingFaceBook, startTransitionFacebook] = useTransition();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignInButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending} className="w-full" variant="default">
                {pending ? 'Signing In..' : 'Sign In'}
            </Button>
        )
    }

    const googleSignIn = async () => {
        startTransition(async () => {
            await signInWithGoogle();
        });

    }

    const facebookSignIn = async () => {
        startTransitionFacebook(async () => {
            await signInWithFacebook();
        });

    }

    const GoogleSignInButton = () => {
        return (
            <>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 py-3 bg-white text-muted-foreground">OR</span>
                    </div>
                </div>
                <Button
                    className="w-full flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
                    variant="outline"
                    onClick={() => googleSignIn()}>
                    {isPending ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                    )} {' '} Sign in with Google
                </Button>
            </>
        )
    }

    const FacebookSignInButton = () => {
        return (
            <>
                <Button
                    className="w-full flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
                    variant="outline"
                    onClick={() => facebookSignIn()}>
                    {isPendingFaceBook ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#2aa4f4"></stop><stop offset="1" stopColor="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
                        </svg>
                    )} {' '} Sign in with Facebook
                </Button>
            </>
        )
    }
    return (
        <form action={action}>
            <input type='hidden' name='callbackUrl' value={callbackUrl} />
            <div className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={signInDefaultValue.email} />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required autoComplete="password" defaultValue={signInDefaultValue.password} />
                </div>

                <div>
                    <SignInButton />
                </div>

                {data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}
                <div className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account? {' '}
                    <Link href='/sign-up' target="_self" className="link">
                        Sign Up
                    </Link>
                </div>

                <GoogleSignInButton />

                <FacebookSignInButton />
            </div>
        </form>
    );
}

export default CredentialsSignInForm;