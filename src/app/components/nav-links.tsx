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

import { Button } from './buttons';
import ShoppingCartButton from './ShoppingCartButton';
import { ShoppingCart, getCart } from '../lib/db/cart';
import { useEffect, useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/views/home' },
  {
    name: 'Invoices',
    href: '/home/invoices',
  },

  { href: '/views/cart', icon: 'cart' },
  { href: '/views/profile', icon: UserIcon },
];

export default function NavLinks() {
  const [cart, setCart] = useState<ShoppingCart | null>(null);
  const pathname = usePathname();
  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      {links.map((link) => {
        const LinkIcon: any = link?.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center text-xl text-[teal]  hover:text-blue-500 transition-colors ',
              {
                'bg-sky-200 underline  text-blue-600': pathname === link.href,
              }
            )}
          >
            {link.icon && (
              <div className="">
                {link.icon === 'cart' ? (
                  <ShoppingCartButton cart={cart} />
                ) : (
                  <LinkIcon className="w-8 h-8 mr-3 " />
                )}
              </div>
            )}

            {link.name && <button className="mr-5 bg ">{link.name}</button>}
          </Link>
        );
      })}
    </>
  );
}
