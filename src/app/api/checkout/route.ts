import { NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

export async function POST(request: any) {
    //const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
    const items = await request.json();



    const lineItems = items.map((product: any) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
                images: [product.image],
            },
            unit_amount: product.price, // el precio debe estar en centavos
        },
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/views/success',
        line_items: lineItems,
        mode: 'payment',
    });
    return NextResponse.json(session)

}