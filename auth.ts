import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import { compareSync } from 'bcrypt-ts-edge';
import { authConfig } from './auth.config';


export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // find  user form database
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                })
                // check if user exist and password matches
                if (user && user.password) {
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }
                // Return null if user does not exist or password does not match
                return null;
            }
        })
    ],
    callbacks: {
        ...authConfig.callbacks,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, user, trigger, token }: any) {
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            if (trigger === 'update') {
                session.user.name = user.name;
            }
            return session;
        },
        // async jwt({ token, user, account, profile, isNewUser }) { return token }
    }

}

export const { handlers, auth, signIn, signOut } = NextAuth(config);