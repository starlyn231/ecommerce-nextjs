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
export async function incrementProductQuantity(userId: string, productId: string) {
    console.log(userId)
    const cart = (await getCart(userId)) ?? (await createCart(userId));

    const articleInCart = cart.items.find((item) => item.productId === productId);
    console.log(articleInCart)
    if (articleInCart) {
        await prisma.cartItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } },
        });

    } else {

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


export async function setProductQuantity(userId: string, productId: string, quantity: number) {
    const cart = (await getCart(userId)) ?? (await createCart(userId));

    const articleInCart = cart.items.find((item) => item.productId === productId);
    console.log('articleInCart', articleInCart)
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


export async function addProductToLikes(userId: string, productId: string) {

    try {
        // Fetch the product and its likedBy relation
        const product = await prisma.products.findUnique({
            where: { id: productId },
            include: { likedBy: { where: { userId } } },
        });

        if (!product) {
            console.log('Product not found with the specified productId:', productId);
            return;
        }

        // Check if the user has already liked the product
        const userLikeIndex = product.likedBy.findIndex((like) => like.userId === userId);
        if (userLikeIndex !== -1) {
            console.log('  delete')
            await prisma.userLikes.delete({
                where: {
                    id: product.likedBy[userLikeIndex].id,
                },
            });
        } else {
            // If like does not exist, add the like
            await prisma.userLikes.create({
                data: {
                    userId: userId,
                    productId: productId,
                },
            });
        }

        // Update the likedByCurrentUser field in the Product model
        const updatedProduct = await prisma.products.findUnique({
            where: { id: productId },
            include: { likedBy: { where: { userId } } },
        });
        if (updatedProduct) {
            const likedByCurrentUser = updatedProduct.likedBy.length > 0;
            await prisma.products.update({
                where: { id: productId },
                data: { likedByCurrentUser },
            });


            // Consulta si ya le gusta al usuario actual
            const likeOrNot = await prisma.userLikes.findFirst({
                where: {
                    userId: userId,
                    productId: productId,
                },
            });
            // Devuelve la cantidad total de "me gusta" y la información de "me gusta" actualizada
            return {
                likedByCurrentUser,
                likeInfo: likeOrNot,
            };
        }
    }
    catch (error) {
        console.error('Error toggling product like:', error);
        throw error;
    }

}

export async function existingLike(userId: string, productId: string) {
    try {
        const likeOrNot = await prisma.userLikes.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
        });

        // Retorna true si existe una relación de like, false si no existe
        return !!likeOrNot;
    } catch (error) {
        console.error('Error al obtener el estado de "me gusta":', error);
        throw error;
    }
}


/* export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', Object.fromEntries(formData));
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialSignin';
        }
        throw error;
    }
} */