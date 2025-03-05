'use server';

import { CartItem } from "@/types";
import { convertToPlainObject, formatError } from "../utils";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validator";

export async function addItemToCart(data: CartItem) {
    try {
        // check cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error("Cart session not found.");

        // get session and userId
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        // get the existing cart from database
        const cart = await getMyCart();

        const item = cartItemSchema.parse(data);

        const product = await prisma.product.findFirst({
            where: {id: item.productId}
        })

        console.log({
            'Session Cart Id': sessionCartId,
            'userId': userId,
            'Item': item,
            'product': product,
        });
        return {
            success: true,
            message: 'Item added to the cart'
        } 
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
    
}

export async function getMyCart() {
    // check cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error("Cart session not found.");

    // get session and userId
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // get the existing cart from database
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId: userId } : { sessionCartId: sessionCartId }
    });
    if (!cart) return undefined;

    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    })
}