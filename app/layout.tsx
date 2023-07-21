import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
// import { Inter } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import getBankInformation from "./actions/getBankInformation";
import BankAccountModal from "./components/modals/BankAccountModal";
import AddProductModal from "./components/modals/AddProductModal";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "e-commerce",
  description: "Mechanical keyboard",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  // console.log({ currentUser: currentUser });

  const userId: string | undefined = currentUser?.id;

  const bankInformation = await getBankInformation(userId);

  return (
    <html lang="en">
      <body
      //  className={inter.className}
      >
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <BankAccountModal />
        <AddProductModal />
        <Navbar currentUser={currentUser} bankInformation={bankInformation} />
        {children}
      </body>
    </html>
  );
}
