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
  const { id, status } = body;

  console.log({ id: id });
  console.log({ status: status });

  try {
    const applyResponse = await prisma?.cart.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(applyResponse);
  } catch (error) {
    console.error("Error occurred while creating the record:", error);
    return NextResponse.error();
  }
}
