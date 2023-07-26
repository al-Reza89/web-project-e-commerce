"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Bank, User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useBankAccountModal from "@/app/hooks/useBankAccountModal";
import useAddProductModal from "@/app/hooks/useAddProductModal";
import { BsCartPlus } from "react-icons/bs";
import CartProducts from "@/app/store/CartProducts";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
  bankInformation?: Bank | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  bankInformation,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const bankModal = useBankAccountModal();
  const productModal = useAddProductModal();
  const router = useRouter();

  const { products: cartProducts } = CartProducts();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleCartButton = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {currentUser && (
          <div>
            {bankInformation?.createStatus ? (
              <div className="text-xl font-bold">
                ${bankInformation?.currentMoney}
              </div>
            ) : (
              <div>$ 0</div>
            )}
          </div>
        )}
        <div className="relative cursor-pointer " onClick={handleCartButton}>
          <BsCartPlus
            size={40}
            fill="black"
            className="hover:fill-blue-900 hover:scale-110 transition ease-in-out delay-150 cursor-pointer "
          />
          <div className="absolute -top-3 right-1 text-white font-bold px-2 bg-red-600 rounded-full ">
            {cartProducts.length}
          </div>
        </div>
        <div
          onClick={() => {}}
          className="hidden font-bold text-xl md:block  py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer "
        >
          {currentUser?.name}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4  md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My Cart" />
                <MenuItem onClick={() => {}} label="My fevourits" />
                {bankInformation === null && (
                  <MenuItem
                    onClick={bankModal.onOpen}
                    label="Create Bank Acc."
                  />
                )}
                <MenuItem onClick={() => {}} label="My Order" />
                {currentUser.role === "ADMIN" && (
                  <div>
                    <hr />
                    <MenuItem
                      onClick={productModal.onOpen}
                      label="Create Product"
                    />
                  </div>
                )}
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
