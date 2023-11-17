'use client';
import {
  UserGroupIcon,
  HomeIcon,
  UserIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {

  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Button } from './buttons';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/home' },
  {
    name: 'Invoices',
    href: '/home/invoices',

  },
  { name: 'Customers', href: '/home/customers' },
  { href: '/cart', icon: ShoppingBagIcon },
  { href: '/profile', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link?.icon;
        return (


          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center hover:text-blue-500 transition-colors ',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            {LinkIcon && <LinkIcon className="w-7 m-3" />}
            {
              link.name && <button className='mr-2'

              >{link.name}</button>}

          </Link>


        );
      })}
    </>
  );
}
