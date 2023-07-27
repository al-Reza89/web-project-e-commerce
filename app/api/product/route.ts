import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json("no current user");
  }

  const body = await request.json();

  const { title, details, imageSrc, price, stock } = body;

  try {
    const ProductResponse = await prisma?.product.create({
      data: {
        userId: currentUser.id,
        title: title,
        details: details,
        imageSrc: imageSrc,
        price: price,
        stock: stock,
      },
    });

    return NextResponse.json(ProductResponse);
  } catch (error) {
    return NextResponse.json(error);
  }
}
