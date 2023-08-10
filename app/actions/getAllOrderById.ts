import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export default async function getAllOrderById(userId: string) {
  try {
    const getAllOrder = await prisma?.cart.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        street: true,
        mobile: true,
        totalPrice: true,
        status: true,
      },
    });

    return getAllOrder;
  } catch (error) {
    return NextResponse.error();
  }
}
