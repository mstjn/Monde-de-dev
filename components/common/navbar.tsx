"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      aria-label="Navigation principale"
      className={`border-b-black border ${
        (pathname === "/login" || pathname === "/register") && "hidden"
      } h-24 w-full md:flex items-center justify-between px-6 md:px-10 flex relative`}
    >
      {" "}
      <Image src="/logo.png" width={140} height={81} alt="Logo MDD" />
      {pathname !== "/login" && pathname !== "/register" && (
        <>
          <ul className="md:flex gap-10 text-xl items-center hidden">
            <form action={logout}>
              <button className="font-bold text-[#A40F0F]" type="submit">
                Se déconnecter
              </button>
            </form>

            <li>
              <Link href="/articles" className={pathname === "/articles" ? "text-[#6C5CCF]" : ""}>
                Articles
              </Link>
            </li>
            <li>
              <Link href="/topics" className={pathname === "/topics" ? "text-[#6C5CCF]" : ""}>
                Thèmes
              </Link>
            </li>
            <li>
              <Link href="/profile" className="bg-[#D9D9D9] p-3 rounded-full block">
                <Image src="/icon_user.svg" width={25} height={25} alt="icône utilisateur" />
              </Link>
            </li>
          </ul>

          <button className="md:hidden mt-2" onClick={() => setIsOpen(true)} aria-label="Ouvrir le menu" aria-expanded={isOpen} aria-controls="mobile-menu">
            <Image src="/hamburger.svg" width={27.5} height={16} alt="Logo hamburger" />
          </button>

          <div
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />
          <div
            id="mobile-menu"
            aria-hidden={!isOpen}
            className={`text-xl h-screen flex flex-col bg-white right-0 w-[66%] fixed top-0 border-l border-black z-50 transition-transform duration-300 ease-in-out md:hidden ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full items-end pr-6 pt-10">
              <form action={logout}>
                <button className="text-lg font-bold text-[#A40F0F]" type="submit">
                  Se déconnecter
                </button>
              </form>

              <ul className="flex flex-col gap-6 mt-6">
                <li>
                  <Link href="/articles" className={pathname === "/articles" ? "text-[#6C5CCF]" : ""}>
                    Articles
                  </Link>
                </li>
                <li>
                  <Link href="/topics" className={pathname === "/topics" ? "text-[#6C5CCF]" : ""}>
                    Thèmes
                  </Link>
                </li>
              </ul>

              <div className="mt-auto">
                <Link href="/profile" className="bg-[#D9D9D9] p-3 rounded-full inline-block">
                  <Image src="/icon_user.svg" width={25} height={25} alt="icône utilisateur" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
