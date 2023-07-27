import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface CartProduct {
  id: string;
  stock: number;
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json("no current user");
  }

  const body = await request.json();
  const { data, cartProducts, totalPrice } = body;
  const numericTotalPrice = parseFloat(totalPrice);

  const requestData = {
    userId: currentUser.id,
    totalPrice: totalPrice,
    firstName: data.firstName,
    lastName: data.lastName,
    street: data.street,
    zip: data.zip,
    mobile: data.mobile,
    items: {
      create: cartProducts.map(({ id, stock }: CartProduct) => ({
        productId: id,
        quantity: stock,
      })),
    },
  };

  try {
    const cartResponse = await prisma?.cart.create({
      data: requestData,
    });

    const bankResponse = await prisma.bank.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    if (bankResponse != undefined) {
      const currentMoney = bankResponse?.currentMoney - totalPrice;

      await prisma.bank.update({
        where: {
          id: bankResponse.id,
        },
        data: {
          currentMoney: currentMoney,
        },
      });
    }

    return NextResponse.json(cartResponse);
  } catch (error) {
    return NextResponse.json(error);
  }
}
