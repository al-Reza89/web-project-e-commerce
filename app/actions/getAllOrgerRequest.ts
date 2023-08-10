import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

export default async function getAllOrderRequest() {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const orderInformation = await prisma.cart.findMany({
      select: {
        id: true,
        userId: true,
        totalPrice: true,
        firstName: true,
        lastName: true,
        street: true,
        zip: true,
        mobile: true,
        createdAt: true,
        status: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return orderInformation;
  } catch (error: any) {
    NextResponse.error();
  }
}
