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
