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
      },
    });

    const getAllOrderWithVerify = getAllOrder?.map((order) => ({
      ...order,
      verifyPerchage: "success",
    }));

    // console.log(getAllOrderWithVerify);

    return JSON.parse(JSON.stringify(getAllOrderWithVerify));
  } catch (error) {
    return NextResponse.error();
  }
}
