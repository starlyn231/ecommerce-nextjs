import Image from "next/image";
import Slider from "../components/slider";
import dataSlider from "../lib/slider-data.json"
import Cardcta from "../components/cta-card";
import CardProduct from "../components/card-products";
import { mockProducts } from "../lib/data";
import { prisma } from "../lib/db/prisma";
export default async function Home() {
    const products = await prisma.products.findMany({
        orderBy: { id: "desc" },
    });
    console.log(products)
    return (

        <div className="flex flex-col w-full items-center ">
            <Slider data={dataSlider} />

            <div className="flex flex-col w-full items-center bg-blue-white justify-center mt-10">
                <h4 className="pb-2 text-[18px] text-[#ff4c3b] leading-6">Special Offer</h4>
                <h2 className="pb-3 text-[18px] text-[#222] font-bold tracking-tight 
                uppercase md:text-[24px] lg:text-[28px] xl:text-[32px] "> TOP COLLECTION</h2>

                <div className="flex flex-wrap items-center text-center justify-center w-full max-w-[700px] mx-auto">
                    <p className="pb-[25px] mb-[15px] mt-[-7] text-[18px] text-[#777] tracking-tighter leading-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry standard dummy text ever since the 1500s</p>


                </div>
                <div className=" grid gap-8 sm:grid-cols-1 sm:gap-12 lg:grid-cols-3 xl:grid-cols-3 xl:gap-16 mb-[25px]">
                    {products.map((product) => (
                        <CardProduct key={product.id} {...product} />
                    ))}

                </div>
            </div>

        </div>

    )
}


