"use client"

import Link from "next/link"
import { useActionState } from "react"
import { login } from "@/lib/actions/auth"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function Login() {
  const [state, action] = useActionState(login, undefined)

  return (
    <section className="relative flex flex-1 flex-col justify-center items-center text-base">
      <Link href="/" className="absolute top-4 left-4"><ArrowLeft size={24} /></Link>
      <Image className="block md:hidden" src="/logo.png" width={225} height={130} alt="Logo MDD" />
      <h1 className="text-2xl mb-10">Se connecter</h1>
      <form action={action} className="flex flex-col w-62.5">
        <label htmlFor="emailOrUsername">E-mail ou nom d&apos;utilisateur</label>
        <input className="border h-12.5 border-black rounded-lg" type="text" id="emailOrUsername" name="emailOrUsername" />
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input className="border h-12.5 border-black rounded-lg" type="password" id="password" name="password" />
        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <br />
        <button type="submit" className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">Se connecter</button>
      </form>
    </section>
  )
}
