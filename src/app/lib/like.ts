"use server"

import { Prisma } from "@prisma/client";


import { cookies } from "next/dist/client/components/headers";
import { prisma } from "./db/prisma";

interface ILikeItem {
    id: string;
    productId: string;
    userId: string;
    product: {
        id: string;
        description: string;
        imageUrl: string;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
        likedByCurrentUser: boolean | null;
    };
}

export const getLikes = async () => {
    const userId: any = cookies().get('localUserId')?.value;
    console.log(userId)
    try {

        const likedProduct = userId
            ? await prisma.userLikes.findMany({

                where: { userId: userId },
                include: { product: true },
            })
            : null;
        console.log(likedProduct)
        if (!likedProduct) {
            return null;
        } else return likedProduct;

    } catch (error) {
        console.error("Error in getliked For this user:", error);
        throw error; // Rechaza la promesa en caso de error
    }
};

export const countUserLikes = async (userId: string): Promise<number> => {
    try {
        const likeCount = await prisma.userLikes.count({
            where: { userId: userId },
        });

        return likeCount;
    } catch (error) {
        console.error("Error in countUserLikes:", error);
        throw error;
    }
};