"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { Bank, User } from "@prisma/client";
import getBankInformation from "@/app/actions/getBankInformation";

interface NavbarProps {
  currentUser?: User | null;
  bankInformation?: Bank | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, bankInformation }) => {
  // console.log({ currentUser });

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu
              currentUser={currentUser}
              bankInformation={bankInformation}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
