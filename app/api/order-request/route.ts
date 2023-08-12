import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, status, totalPrice } = body;

  console.log({ id: id });
  console.log({ status: status });

  try {
    if (status === "DECLINE") {
      const applyResponse = await prisma?.cart.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
        select: {
          userId: true,
        },
      });

      const updatRes = await prisma.bank.update({
        where: {
          userId: applyResponse?.userId,
        },
        data: {
          currentMoney: {
            increment: totalPrice,
          },
        },
      });

      return NextResponse.json(updatRes);
    } else if (status === "ACCEPT") {
      const applyResponse = await prisma?.cart.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });

      const updateMoney = await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          money: currentUser.money + totalPrice,
        },
      });

      console.log({ updateMoney: updateMoney });

      return NextResponse.json(applyResponse);
    } else {
      return NextResponse.json;
    }
  } catch (error) {
    console.error("Error occurred while creating the record:", error);
    return NextResponse.error();
  }
}
