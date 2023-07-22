import prisma from "@/app/libs/prismadb";

export default async function getAllProducts() {
  try {
    const allProducts = await prisma?.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return allProducts;
  } catch (error: any) {
    throw new Error(error);
  }
}
