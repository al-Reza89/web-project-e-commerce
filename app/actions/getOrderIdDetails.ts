import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

export default async function getOrderIdDetails(params: string) {
  try {
    const cartDetails = await prisma.cart.findUnique({
      where: {
        id: params,
      },
      select: {
        totalPrice: true,
        street: true,
        zip: true,
        id: true,
        items: {
          select: {
            quantity: true,
            id: true,
            product: {
              select: {
                id: true,
                imageSrc: true,
                title: true,
                details: true,
                price: true,
              },
            },
          },
        },
      },
    });

    console.log(cartDetails);

    return cartDetails;
  } catch (error: any) {
    return NextResponse.error();
  }
}
