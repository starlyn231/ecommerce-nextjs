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

export const getCart = async () => {
    /*    new Promise<ShoppingCart>(async (resolve) => { */
    const localCartId = cookies().get("localCartId")?.value;

    try {
        const cart = localCartId
            ? await prisma.cart.findUnique({
                where: { id: localCartId },
                include: { items: { include: { products: true } } },
            })
            : null;
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




/*         resolve({
            ...cart,
            size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
            subtotal: cart.items.reduce(
                (acc, item) => acc + item.quantity * item.products.price,
                0
            ),
        })
    }) */

/* 
const getCart = async ():ShoppingCart | null  => {


return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
        (acc, item) => acc + item.quantity * item.products.price,
        0
    ),
};
} */
/* export async function getCart(): ShoppingCart | null {

  
} */

export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {

        }
    })
    // Note: Needs encryption + secure settings in real production app
    cookies().set('localCartId', newCart.id)
    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0,
    }
}