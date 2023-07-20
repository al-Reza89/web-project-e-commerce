import prisma from "@/app/libs/prismadb";

export default async function getBankInformation(userId: string | undefined) {
  try {
    const bankInformationResponse = await prisma.bank.findUnique({
      where: {
        userId: userId as string,
      },
    });

    if (!bankInformationResponse) return null;

    return bankInformationResponse;
  } catch (error: any) {
    return null;
  }
}
