'use client';
import Link from 'next/link';
import ShoppingCartButton from './ShoppingCartButton';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import logo from '../../../public/logo.png';
import { getCart } from '../lib/db/cart';
import NavLinks from './nav-links';
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function NavbarSimple() {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Navbar className=" w-full max-w-full rounded-none  bg-white py-2 px-4 text-white lg:px-8 lg:py-4  ">
            <div className="flex flex-row items-center justify-between text-blue-gray-900">
                <Link href="/views/home">
                    <Typography
                        as="a"
                        href="#"
                        variant="h5"
                        className="mr-4 text-xl text-[teal] cursor-pointer py-1.5"
                    >
                        Shooping Starlyn S.A
                    </Typography>
                </Link>
                <div className="hidden lg:flex w-[80%]  justify-end space-b ">
                    <NavLinks />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavLinks />
            </Collapse>
        </Navbar>
    );
}
