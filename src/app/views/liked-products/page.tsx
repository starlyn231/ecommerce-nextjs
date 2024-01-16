import CardProduct from "@/app/components/card-products";
import { getProduct } from "@/app/lib/data";
import { getLikes } from "@/app/lib/like";
import Image from "next/image"


export default async function ProductPage() {
    const likeOfUser = await getLikes();
    //console.log(likeOfUser)
    return (

        <div className="bg-gray-100 dark:bg-gray-800 py-8 h-full ">
            <div className=" mx-auto px-4 sm:px-6 lg:px-4 ">
                <div className="flex flex-col md:flex-row -mx-4 ">
                    <div className=" m-2 p-5 grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-3 xl:gap-16 mb-[25px">
                        {likeOfUser?.map((product) => (
                            <CardProduct key={product.id} {...product.product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>


    )
}


