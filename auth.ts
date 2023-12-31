/* import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { prisma } from '@/app/lib/db/prisma';
import type { Adapter } from "@auth/core/adapters"
 async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User> `SELECT * from USERS where email=${email}`;
        return user.rows[0]
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
 

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials: any) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    // const user = await getUser(email);
                    const userFound = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });
                    if (!userFound) throw new Error('No user found');

                    console.log(userFound);
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        userFound.password
                    );

                    if (passwordsMatch) return userFound;
                }
                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});
 */