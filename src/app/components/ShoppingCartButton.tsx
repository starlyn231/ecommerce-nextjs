"use client";

import Link from "next/link";
import { ShoppingCart } from "../lib/db/cart";
import { formatPrice } from "../lib/format";
import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import { useState } from "react";

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
    const [openPopover, setOpenPopover] = useState(false);
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    return (
        <Popover open={openPopover} handler={setOpenPopover}>
            <div className="dropdown-end dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn">
                    <PopoverHandler {...triggers}>
                        <div className="indicator">

                            <div className="relative py-2  mr-3">
                                <div className="t-0 absolute left-5">
                                    <p className="flex h-1 w-[2px] items-center justify-center  bg-red-500 p-3 text-xs text-white">  {cart?.size || 0}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: w-8 h-8 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>

                        </div>
                    </PopoverHandler>
                </label>
                <PopoverContent {...triggers} className="z-50 max-w-[24rem]">



                    <div className="card-body flex flex-col">
                        <span className="text-lg font-bold">{cart?.size || 0} Items</span>
                        <span className="text-info mb-2">
                            Subtotal: {formatPrice(cart?.subtotal || 0)}
                        </span>
                        <div className=" flex text-center card-actions w-full">
                            <Link
                                href="/views/cart"
                                className=" p-1 btn-primary btn-block btn w-full bg-[teal] rounded text-cyan-50"

                            >
                                View cart
                            </Link>
                        </div>
                    </div>


                </PopoverContent>
            </div>
        </Popover>
    );
}