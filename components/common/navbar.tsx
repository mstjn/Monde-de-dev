import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="border-b-black border h-24 w-full hidden md:block">
        <Image src="/logo.png" width={140} height={81} alt="Logo MDD" />
    </nav>
  )
}