import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

export default async function getTotalMoney() {
  const currentUser = await getCurrentUser();

  try {
    if (currentUser?.role === "ADMIN") {
      const totalMoney = await prisma?.user.findUnique({
        where: {
          id: currentUser.id,
        },
        select: {
          money: true,
        },
      });

      return totalMoney;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
