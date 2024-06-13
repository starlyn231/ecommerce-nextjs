'use client';

import { CartItemWithProduct } from '@/app/lib/db/cart';

interface CartEntryProps {
    cartItem: CartItemWithProduct;
}
const CheckoutButton = (product: any) => {
    const { items } = product.product;
    const handlePay = async () => {
        try {
            const itemsData = items.map((item: any) => {
                return {
                    id: item.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.products.price,
                    name: item.products.name,
                    image: item.products.imageUrl,
                };
            });
            console.log('itemsData front end:  ', itemsData);

            const resp = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify(itemsData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const session = await resp.json();
            console.log(session.url);
            //window.location = session.url;
            window.open(session.url, '_blank');
        } catch (error) {
            console.error('Error al serializar el producto:', error);
        }
    };
    return (
        <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handlePay}
        >
            Check out
        </button>
    );
};

export default CheckoutButton;
