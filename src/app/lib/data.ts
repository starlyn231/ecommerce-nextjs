import { cache } from "react";
import { prisma } from "./db/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IDataProduct } from "./definitions";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export async function getProduct(id: string) {
    try {
        const product = await prisma.products.findUnique({ where: { id } });
        if (!product) notFound();
        return product;
    } catch (error) {
        console.error('Database Error:', error);
    }

};

export async function generateMetadata({
    params: { id },
}: ProductPageProps): Promise<Metadata> {
    const product = await <any>getProduct(id);
    return {
        title: product.name + " - Flowmazon",
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }],
        },
    };
}