import { getProduct, sortBy } from "@/app/lib/data";
import Image from "next/image"

import { fetchProductsByCategory, incrementProductQuantity } from "@/app/lib/actions";
import { cookies } from "next/dist/client/components/headers";
import AddToCartButton from "../../product-page/[id]/AddToCartButton";
import { prisma } from "@/app/lib/db/prisma";
import CardProduct from "@/app/components/card-products";
import Pagination from "@/app/components/pagination";
import CustomerSelect from "@/app/components/select";
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
export default async function Page({ params, searchParams }: {
    params: { id: string }, searchParams?:
    { query?: string, page?: string }
}) {
    const category = params.id;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    //  const totalPages = await fetchInvoicesPages(query);
    console.log(category)
    // const userId: any = cookies().get('localUserId')?.value;
    const productsByCategory = await prisma.products.findMany({
        where: {
            category: category // Replace categoryName with the category you want to filter by
        },
        orderBy: { id: 'desc' } // Optional: You can specify the ordering if needed
    });
    console.log(productsByCategory)
    const totalPages = await fetchProductsByCategory(category)
    console.log(totalPages)
    return (

        <div className="bg-gray-100 dark:bg-gray-800 py-8 h-full">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
                <div className=" ">   <CustomerSelect data={sortBy} defaultOption={'Sort By'} /></div>
                <div className=" m-2 p-5 grid gap-8 sm:grid-cols-1 sm:gap-12 lg:grid-cols-3 xl:grid-cols-3 xl:gap-16 mb-[25px]">

                    {productsByCategory.map((product) => (
                        <CardProduct key={product.id} {...product} />
                    ))}
                </div>
            </div>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>


    )
}


