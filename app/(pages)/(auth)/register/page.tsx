"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register } from "@/lib/actions/auth";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const [state, action] = useActionState(register, undefined);

  return (
    <section className="relative flex flex-1 flex-col justify-center items-center text-base">
      <Link href="/" className="absolute top-4 left-4"><ArrowLeft size={24} /></Link>
      <Image className="block md:hidden" src="/logo.png" width={225} height={130} alt="Logo MDD" />
      <h1 className="text-2xl mb-10">Inscription</h1>
      <form action={action} className="flex flex-col w-62.5">
        <label htmlFor="username">Nom d&apos;utilisateur</label>
        <input className="border h-12.5 border-black rounded-lg" type="text" id="username" name="username" />
        {state?.errors?.username && <p className="text-red-500 text-sm">{state.errors.username[0]}</p>}
        <br />
        <label htmlFor="email">Adresse e-mail</label>
        <input className="border h-12.5 border-black rounded-lg" type="email" id="email" name="email" />
        {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input className="border h-12.5 border-black rounded-lg" type="password" id="password" name="password" />
        {state?.errors?.password && <p className="text-red-500 text-sm">{state.errors.password[0]}</p>}
        <br />
        <button className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">S&apos;inscrire</button>
      </form>
    </section>
  );
}
