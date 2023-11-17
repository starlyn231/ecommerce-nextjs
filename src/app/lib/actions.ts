'use server';
import { z } from 'zod';
import { prisma } from './db/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    revalidatePath('/home');
    redirect('/home');
}
