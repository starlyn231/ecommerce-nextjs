"use client";
import { CartItemWithProduct } from "@/app/lib/db/cart";
import { formatPrice } from "@/app/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";


interface CartEntryProps {
    cartItem: CartItemWithProduct;
    setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
    cartItem: { products, quantity },
    setProductQuantity,
}: CartEntryProps) {
    const [isPending, startTransition] = useTransition();

    const quantityOptions: JSX.Element[] = [];
    for (let i = 1; i <= 99; i++) {
        quantityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        );
    }

    return (


        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            {/*   <img
                    src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                /> */}
            <Image
                src={products.imageUrl}
                alt={products.name}
                width={200}
                height={100}
                className="w-full h-40 rounded-lg  sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                        Nike Air Max 2019
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-300">
                        <div className="my-1 flex items-center gap-2 text-2xl rounded-lg border-2 border-rose-600  bg-blue-gray-100">
                            Quantity:
                            <select
                                className="select-bordered select w-full max-w-[80px] text-1xl"
                                defaultValue={quantity}
                                onChange={(e) => {
                                    const newQuantity = parseInt(e.currentTarget.value);
                                    startTransition(async () => {
                                        await setProductQuantity(products.id, newQuantity);
                                    });
                                }}
                            >
                                <option value={0}>0 (Remove)</option>
                                {quantityOptions}
                            </select>
                        </div>


                    </div>
                    <div className="flex items-center space-x-4">

                        <p className="text-2xl font-bold"> {formatPrice(products.price)}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>


    );
}