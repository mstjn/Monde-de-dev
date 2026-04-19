"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b-black border h-24 w-full hidden md:flex items-center justify-between px-10">
        <Image src="/logo.png" width={140} height={81} alt="Logo MDD" />
        <ul className="flex gap-10 text-xl items-center">
          <li className="font-bold text-[#A40F0F]">Se déconnecter</li>
          <li><Link href="/articles" className={pathname === "/articles" ? "text-[#6C5CCF]" : ""}>Articles</Link></li>
          <li><Link href="/topics" className={pathname === "/topics" ? "text-[#6C5CCF]" : ""}>Thèmes</Link></li>
          <li><Link href="/profile" className="bg-[#D9D9D9] p-3 rounded-full block"><Image src="/icon_user.svg" width={25} height={25} alt="icône utilisateur"/></Link></li>
        </ul>
    </nav>
  )
}