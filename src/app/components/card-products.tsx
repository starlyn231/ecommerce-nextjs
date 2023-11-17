import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react'
import { IDataProduct } from '../lib/definitions';
import PriceTag from './PriceTag';

const CardProduct: FunctionComponent<IDataProduct> = ({
    id,
    name,
    price,
    imageUrl,
    description,
    buttons, href,
    createdAt
}) => {
    const isNew =
        Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <Link key={id}
                    href={"/product-page/" + id}>
                    <figure>
                        <Image
                            src={imageUrl}
                            width={1000}
                            height={760}
                            className="md:block"
                            alt="Screenshots of the dashboard project showing desktop and mobile versions"
                        />
                    </figure>
                </Link>
                <div className="px-5 pb-5">
                    <Link key={id}
                        href={"/list-product/" + id}>
                        <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                            {name}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="card-body">

                            {isNew && <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">NEW</span>}
                            <p>{description}</p>
                            <PriceTag price={price} />
                        </div>
                        <a
                            href="#"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add cart
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CardProduct;
