"use client"
import { useState, useTransition } from "react";

interface AddToCartButtonProps {

    productId: string;
    incrementProductQuantity: (userId: string, productId: string, color: string, size: string) => Promise<void>;
    userId: string,
    color: string;
    size: string;
}

export default function AddToCartButton({
    productId,
    incrementProductQuantity,
    userId,
    color,
    size

}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);

    const addToCart = async () => {
        try {
            // Llama a la función del servidor
            setSuccess(false);
            startTransition(async () => {
                await incrementProductQuantity(userId, productId, color, size);
            });
            // Si no hubo excepciones, entonces la transición fue exitosa
            setSuccess(true);
            // Si la función no lanzó una excepción, consideramos que fue exitosa
            setSuccess(true);
            if (!isPending && success) return alert(' agregado correcta')

        } catch (error) {
            // Manejar el error si la función del servidor falla
            console.error("Error al agregar al carrito:", error);
            setSuccess(false); // Puedes optar por no cambiar el estado si hay un error
        }
    };
    return (
        <div className="flex items-center gap-2">
            <button
                className="flex mr-2 bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                onClick={addToCart}
            >
                Add to Cart
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            </button>
            {isPending && <span className="loading loading-spinner loading-md" />}
            {/*    {!isPending && success && (
                <Alert color="green">
                    A success alert for showing message.
                </Alert>
            )} */}
        </div>
    )
}