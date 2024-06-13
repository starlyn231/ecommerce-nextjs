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
interface ISize {
    id: number;
    label: string;
}


export const sizeMockup: ISize[] = [
    { id: 1, label: 'S' },
    { id: 2, label: 'M' },
    { id: 3, label: 'L' },
    { id: 4, label: 'XL' },
    { id: 5, label: 'XXL' },
];

export const sortBy: any[] = [
    { id: 1, label: 'Reommend' },
    { id: 2, label: 'New' },
    { id: 3, label: 'Top Rated' },
    { id: 4, label: 'Low To High' },
    { id: 5, label: 'High To Low' },
];
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