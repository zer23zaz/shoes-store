'use client';

import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.action";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const AddToCart = ({ item }: { item: CartItem }) => {

    const router = useRouter();

    const handleAddToCart = async () => {
        const res = await addItemToCart(item);

        if (res.success) {
            toast(`${res.message}`, {
                // description: "Sunday, December 03, 2023 at 9:00 AM",
                action: {
                    label: "Go to Cart",
                    onClick: () => router.push('/cart'),
                },
            })
        }
    }
    return (<>
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            Add To Cart
        </Button>
    </>);
}

export default AddToCart;