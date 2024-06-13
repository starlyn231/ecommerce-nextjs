import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/db/prisma"
import { Adapter } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import NextAuth from "next-auth/next"
import { env } from "@/app/lib/env"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server"
import { cookies } from "next/dist/client/components/headers"

export const authOptions: NextAuthOptions = {
    /*     adapter: PrismaAdapter(prisma) as Adapter, */
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****" },
            },
            async authorize(credentials: any, req) {
                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('No user found')
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if (!matchPassword) throw new Error('Wrong password')



                cookies().set('localUserId', userFound.id)
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,

                };
            },
        }),
    ],


    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }