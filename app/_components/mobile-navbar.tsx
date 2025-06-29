import { ChartBar, CreditCard, Menu, Signature, X } from "lucide-react";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

type MobileNavbarProps = {
  pathname: string;
};

const MobileNavbar = ({ pathname }: MobileNavbarProps) => {
  return (
    <nav className="flex items-center justify-between border-b border-solid px-8 py-4 md:hidden">
      <Image src={"/logo.svg"} alt="Financez" width={173} height={39} />

      <Drawer>
        <DrawerTrigger>
          <Menu size={24} />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="flex items-center justify-end">
            <DrawerClose>
              <X size={24} />
            </DrawerClose>
          </DrawerHeader>

          <div className="flex flex-col px-4 pb-4">
            <div className="flex items-center gap-2 py-2">
              <ChartBar size={18} className="text-muted-foreground" />
              <Link
                href={"/"}
                className={`${
                  pathname === "/"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
            </div>

            <div className="flex items-center gap-2 border-t border-border py-2">
              <CreditCard size={18} className="text-muted-foreground" />
              <Link
                href={"/transactions"}
                className={`${
                  pathname === "/transactions"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Transações
              </Link>
            </div>
            <div className="flex items-center gap-2 border-t border-border py-2">
              <Signature size={18} className="text-muted-foreground" />
              <Link
                href={"/subscription"}
                className={`${
                  pathname === "/subscription"
                    ? "font-bold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Assinatura
              </Link>
            </div>

            <div className="mt-2 flex justify-end">
              <UserButton showName />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default MobileNavbar;
