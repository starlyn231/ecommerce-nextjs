"use server"
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/dist/client/components/headers";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: { items: { include: { products: true } } };
}>;
export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { products: true };
}>;

export type ShoppingCart = CartWithProducts & {
    size?: number;
    subtotal: number;
};

export const getCart = async (userId: string) => {
    //const localCartId = cookies().get("localCartId")?.value;
    try {
        /*    const cart = localCartId
               ? await prisma.cart.findUnique({
                   where: { id: localCartId },
                   include: { items: { include: { products: true } } },
               })
               : null; */


        const cart = await prisma.cart.findFirst({
            where: { userId: userId },
            include: { items: { include: { products: true } } },
        });

        if (!cart) {
            return null;
        }

        return {
            ...cart,
            size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
            subtotal: cart.items.reduce(
                (acc, item) => acc + item.quantity * item.products.price,
                0
            ),
        };
    } catch (error) {
        console.error("Error in getCart:", error);
        throw error; // Rechaza la promesa en caso de error
    }
};

export async function createCart(userId: string): Promise<ShoppingCart> {
    console.log('this userId', userId)
    const newCart = await prisma.cart.create({
        data: {
            userId: userId,
        }
    })

    cookies().set('localCartId', newCart.id)
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    }
}