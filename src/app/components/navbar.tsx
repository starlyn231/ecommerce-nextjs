
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from "../../../public/logo.png";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavLinks from './nav-links';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getCart } from '../lib/db/cart';
import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { HeartIcon } from '@heroicons/react/24/outline';
import { getLikes } from '../lib/like';
export default async function NavbarSimple() {
    const session = await getServerSession(authOptions);
    const cart = await getCart();
    return (
        <div className="bg-base-100 ">
            <div className=" navbar mx-5 flex justify-between space gap-2 sm:flex-row">
                <div className="flex-1">
                    <Link href="/views/home" className="btn-ghost btn text-xl normal-case">
                        <Image src={logo} height={40} width={40} alt="Flowmazon logo" />
                        Flowmazon
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-2">
                    {/*  <button className='bg-blue-gray-200'>  <Link href="view/profile">dd</Link></button> */}
                    <ShoppingCartButton cart={cart} />
                    <UserMenuButton session={session} />
                    <Link href="/views/liked-products">

                        <HeartIcon className="w-8 h-8 mr-3 " />
                    </Link>
                </div>
            </div>
        </div>
    );
}
