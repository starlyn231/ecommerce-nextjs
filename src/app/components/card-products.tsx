import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { IDataProduct } from '../lib/definitions';
import PriceTag from './PriceTag';
import AddToCartButton from '../views/product-page/[id]/AddToCartButton';
import { addProductToLikes, incrementProductQuantity } from '../lib/actions';
import { HeartIcon } from '@heroicons/react/24/outline';
import LikeIcon from './like-icon';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getUserIdFromLocalStorage } from '../util/localstorage';
import { cookies } from 'next/dist/client/components/headers';

const CardProduct: FunctionComponent<IDataProduct> = ({
    id,
    name,
    price,
    imageUrl,
    description,
    createdAt,
}) => {
    const isNew =
        Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    const userId: any = cookies().get('localUserId')?.value;
    return (
        <div className="group my-5  h-[400px] flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-m ">
            <Link key={id} href={'/views/product-page/' + id}>
                <div className="relative flex h-60 overflow-hidden">
                    <Image
                        src={imageUrl}
                        width={1000}
                        height={760}
                        className="relative top-0 right-0 h-full w-full object-cover"
                        alt="Screenshots of the dashboard project showing desktop and mobile versions"
                    />
                </div>
            </Link>
            <div className=" h-ful">
                <Link key={id} href={'/list-product/' + id}>
                    <h3
                        className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white 
                     ml-2 whitespace-nowrap text-ellipsis overflow-hidden "
                    >
                        {name}
                    </h3>
                </Link>

                <div className="flex  flex-col m-2">
                    <div className="card-body my-1">
                        {isNew && (
                            <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                NEW
                            </span>
                        )}
                        {/* <p>{description}</p> */}

                        <PriceTag
                            className="text-3xl font-bold text-slate-900"
                            price={price}
                        />
                        <span className="text-sm ml-2 text-slate-900 line-through">
                            $99
                        </span>
                    </div>
                    {/*      <button className="flex my-3 items-center justify-center w-[50%] bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to cart
                    </button> */}
                    <div className="flex justify-between mt-2">
                        <AddToCartButton
                            productId={id}
                            incrementProductQuantity={incrementProductQuantity}
                            userId={userId}
                        />
                        <LikeIcon
                            addProductToLikes={addProductToLikes}
                            productId={id}
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;
