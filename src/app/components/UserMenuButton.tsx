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
            <PopoverContent {...triggers} className="z-50 max-w-[24rem]">
                <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
                >
                    <li>
                        {user ? (<div className="flex flex-col">
                            {user.email}
                            <Link href="/api/auth/signout">Logout</Link>
                        </div>

                        ) : (

                            <button onClick={() => signIn()}>Sign In</button>
                        )}
                    </li>
                </ul>
            </PopoverContent>

        </Popover>
    );
}
