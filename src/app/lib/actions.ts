'use server';
import { z } from 'zod';
import { prisma } from './db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createCart, getCart } from './db/cart';

const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(4, { message: "product must be atleast 4 characters" }),
    price: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    description: z.string().min(12, { message: "Description of product must be atleast 12 characters" }),
    imageUrl: z.string().min(1, { message: "Please insert a product image" }),

});

const CreateProduct = FormSchema.omit({ id: true, date: true });
export type State = {
    errors?: {
        name?: string[];
        description?: string[];
        price?: number[];
        imageUrl?: string[];
    };
    message?: string | null;
};
/**
 * The function `addProduct` is an asynchronous function that adds a product to a database using form
 * data, performs form validation, and handles any errors that may occur.
 * @param {State} prevState - The `prevState` parameter is the previous state of the application. It is
 * used to access any existing data or state that may be needed in the function.
 * @param {FormData} formData - The `formData` parameter is of type `FormData`, which is a built-in
 * JavaScript class used to handle data from HTML forms. It is typically used to send data via AJAX
 * requests or to construct and send `multipart/form-data` requests.
 * @returns an object with the following properties:
 */
export async function addProduct(prevState: State, formData: FormData) {
    const validatedFields = CreateProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        imageUrl: formData.get('imageUrl'),
        price: formData.get('price'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create product.',
        };
    }
    const { name, description, imageUrl, price } = validatedFields.data;

    try {
        await prisma.products.create({
            data: { name, description, imageUrl, price },
        });
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/views/home');
    redirect('/views/home');
}





/**
 * The `incrementProductQuantity` function increments the quantity of a product in the cart or adds it
 * to the cart if it doesn't exist.
 * @param {string} productId - The `productId` parameter is a string that represents the unique
 * identifier of a product.
 */
export async function incrementProductQuantity(productId: string) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find((item) => item.productId === productId);
    console.log('no entro')
    if (articleInCart) {
        console.log('update')
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
        });
    } else {
        console.log('create')
        await prisma.cartItem.create({

            data: {
                cartId: cart.id,
                productId,
                quantity: 1,
            },
        });
    }

    revalidatePath("/product-page/[id]");
}

/* async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}  */


export async function setProductQuantity(productId: string, quantity: number) {
    const cart = (await getCart()) ?? (await createCart());

    const articleInCart = cart.items.find((item) => item.productId === productId);

    if (quantity === 0) {
        if (articleInCart) {
            await prisma.cartItem.delete({
                where: { id: articleInCart.id },
            });
        }
    } else {
        if (articleInCart) {
            await prisma.cartItem.update({
                where: { id: articleInCart.id },
                data: { quantity },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }
    }

    revalidatePath("/cart");
}