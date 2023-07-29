import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json("no current user");
  }

  const body = await request.json();

  const { bankId, amount } = body;

  const amountInt = parseInt(amount);

  try {
    const applyResponse = await prisma?.approveMoney.create({
      data: {
        bankId: bankId,
        amount: amountInt,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(applyResponse);
  } catch (error) {
    console.error("Error occurred while creating the record:", error);
    return NextResponse.json(error);
  }
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== "BANK") {
    return NextResponse.error();
  }

  const { id, status } = body;

  try {
    const applyResponse = await prisma?.approveMoney.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    const bankResponse = await prisma?.bank.update({
      where: {
        id: applyResponse.bankId,
      },
      data: {
        currentMoney: {
          increment: applyResponse.amount,
        },
      },
    });

    return NextResponse.json(bankResponse);
  } catch (error) {
    console.error("Error occurred while creating the record:", error);
    return NextResponse.error();
  }
}
