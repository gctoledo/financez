"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden items-center justify-between border-b border-solid px-8 py-4 md:flex">
        <div className="flex items-center gap-10">
          <Image src={"/logo.svg"} alt="Financez" width={173} height={39} />
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href={"/transactions"}
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href={"/subscription"}
            className={
              pathname === "/subscription"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Assinatura
          </Link>
        </div>

        <UserButton showName />
      </nav>

      <MobileNavbar pathname={pathname} />
    </>
  );
};

export default Navbar;
