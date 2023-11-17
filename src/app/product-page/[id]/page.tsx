import { getProduct } from "@/app/lib/data";
import Image from "next/image"
interface ISize {
    id: number;
    label: string;
}

const sizeMockup: ISize[] = [
    { id: 1, label: 'S' },
    { id: 2, label: 'M' },
    { id: 3, label: 'L' },
    { id: 4, label: 'XL' },
    { id: 5, label: 'XXL' },
];
export default async function ProductPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const { name, imageUrl, description, price }: any = await getProduct(id);
    return (

        <div className="bg-gray-100 dark:bg-gray-800 py-8 h-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">

                            <Image
                                src={imageUrl}
                                alt={name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                                    Add to Cart
                                </button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            Product Name
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {name}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Price:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">{price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Availability:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Select Color:
                            </span>
                            <div className="flex items-center mt-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2" />
                                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2" />
                                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2" />
                                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Select Size:
                            </span>
                            <div className="flex items-center mt-2">
                                <select
                                    id="customer"
                                    name="customerId"
                                    className="peer block  rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    defaultValue=""
                                    aria-describedby="customer-error"
                                >
                                    <option value="" disabled>
                                        Select size
                                    </option>
                                    {sizeMockup.map((size) => (
                                        <option key={size.id} value={size.label}>
                                            {size.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">
                                Product Description:
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}


