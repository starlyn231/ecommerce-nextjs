'use client';

import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from '@material-tailwind/react';
import profilePicPlaceholder from '../../../public//profile-pic-placeholder.png';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
interface UserMenuButtonProps {
    session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
    const user = session?.user;
    const [openPopover, setOpenPopover] = useState(false);
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };

    return (
        <Popover open={openPopover} handler={setOpenPopover}>

            <PopoverHandler {...triggers}>

                {user ? (
                    <Image
                        src={user?.image || profilePicPlaceholder}
                        alt="Profile picture"
                        width={40}
                        height={40}
                        className="w-10 rounded-full"
                    />
                ) : (
                    <UserIcon className="w-8 h-8 mr-3 " />
                )}

            </PopoverHandler>
            <PopoverContent {...triggers} className="z-50 max-w-[15rem]">
                <ul className="space-y-4 text-left text-base text-gray-500 p-2 dark:text-gray-400 w-[95%]" >

                    {user ? (
                        <div className=" grid grid-cols-1 divide-y divide-gray-900 ">
                            <li className='line-clamp-1 truncate space-x-5 hover:underline overflow-hidden
                             whitespace-nowrap text-ellipsis my-1 '>  {user.email}</li>

                            <Link className=" border-none no-nderline text-current" href="/api/auth/signout"><li className='space-x-3 hover:underline my-1'>Logout</li></Link>
                        </div>

                    ) : (

                        <button onClick={() => signIn()}>Sign In</button>
                    )}

                </ul>
            </PopoverContent>

        </Popover>
    );
}
