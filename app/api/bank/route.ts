import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { secret } = body;

  try {
    const BankResponse = await prisma?.bank.create({
      data: {
        secret: secret,
        createStatus: true,
        userId: currentUser.id,
      },
    });

    console.log(BankResponse);

    return NextResponse.json(BankResponse);
  } catch (error) {
    return NextResponse.error();
  }
}
