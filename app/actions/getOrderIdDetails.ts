import prisma from "@/app/libs/prismadb";
import { toast } from "react-hot-toast";

export default async function getOrderIdDetails(params: string) {
  try {
    const cartDetails = await prisma.cart.findUnique({
      where: {
        id: params,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // console.log(cartDetails);

    return cartDetails;
  } catch (error: any) {
    return null;
  }
}
