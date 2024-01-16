import { getServerSession } from 'next-auth/next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/logo.png';
import { authOptions } from '../api/auth/[...nextauth]/route';


import DrawerDefault from './drawer';
export default async function SubNavbar() {
    const session = await getServerSession(authOptions);

    //console.log(session);
    return (
        <div className="border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 ">
            <div className=" navbar mx-5 flex justify-between space gap-2 sm:flex-row">
                <DrawerDefault data={session} />

                <div className="flex-grow items-center space-x-7 justify-end hidden lg:flex xl:mx-25 lg:mx-20 ">
                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Today Deals
                    </Link>

                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Books
                    </Link>

                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Shop By Interest
                    </Link>
                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Best seller
                    </Link>
                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Best Product
                    </Link>

                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Category
                    </Link>
                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Clothes
                    </Link>

                    <Link href="/views/cart" className=" text-sm xl:text-base font-bold">
                        Others
                    </Link>
                </div>
            </div>
        </div>
    );
}
