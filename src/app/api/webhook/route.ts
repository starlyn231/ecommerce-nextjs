import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";


const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
console.log(' klk')
// card number: 4242 4242 4242 4242
// mm 1040  cvc 123
export async function POST(request: any) {
    const body = await request.text();
    const headersList = headers();
    const sig = headersList.get("stripe-signature");
    console.log(' entre ')
    let event;

    /*   try {
          event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      } catch (error) {
          console.log(error);
          return NextResponse.json({ error: error.message }, { status: 400 });
      } */

    switch (event.type) {
        case "checkout.session.completed":
            const checkoutSessionCompleted = event.data.object;

            // guardar en una base de datos
            console.log(
                "Consultado producto con id",
                checkoutSessionCompleted.metadata.productId
            );

            // enviar un correo

            console.log({ checkoutSessionCompleted });
            break;
        default:
            console.log(`Evento no manejado: ${event.type}`);
    }

    return new Response(null, { status: 200 });
}