import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export default async function getProductById(params: string) {
  //   console.log(params);

  try {
    const productdetailsWithId = await prisma.product.findUnique({
      where: {
        id: params,
      },
    });

    if (!productdetailsWithId) {
      return null;
    }

    // const { userId, createdAt, updatedAt, ...productDetailsWithoutId } =
    //   productdetailsWithId;

    // return productdetailsWithId;
    return JSON.parse(JSON.stringify(productdetailsWithId));
  } catch (error) {
    return NextResponse.error();
  }
}
