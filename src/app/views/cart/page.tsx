
import { getCart } from "@/app/lib/db/cart";
import CartEntry from "./cart-entry";
import { setProductQuantity } from "@/app/lib/actions";
import { formatPrice } from "@/app/lib/format";

export const metadata = {
    title: "Your Cart - Flowmazon",
};
export default async function CartPage() {
    const cart = await getCart();

    return (
        <div className="w-[100%] h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
            <div className="border-r-light-blue-500 mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg  md:w-full">
                    {cart?.items.map((cartItem) => (
                        <CartEntry
                            cartItem={cartItem}
                            key={cartItem.id}
                            setProductQuantity={setProductQuantity}
                        />

                    ))}

                    {!cart?.items.length && <p>Your cart is empty.</p>}
                </div>

                <div className="mt-6 h-full  rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">$129.99</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$4.99</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">   Total: {formatPrice(cart?.subtotal || 0)}</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                        Check out
                    </button>
                </div>
            </div>

        </div>

    );
}