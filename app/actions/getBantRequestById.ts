import prisma from "@/app/libs/prismadb";

export default async function getBankRequestById(userId: string) {
  try {
    const allBankInformation = await prisma.approveMoney.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        bank: {
          select: {
            currentMoney: true,
          },
        },
      },
    });

    const rows = allBankInformation.map((bankInformation) => ({
      amount: bankInformation.amount || 0,
      status: bankInformation.status || "",
      currentMoney: bankInformation.bank.currentMoney,
      id: bankInformation.id,
      name: bankInformation.user.name,
      email: bankInformation.user.email,
    }));

    // return JSON.parse(JSON.stringify(rows));
    return rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle errors accordingly
  }
}
