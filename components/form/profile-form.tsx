"use client";

import { updateProfile } from "@/lib/actions/user";
import { useActionState } from "react";

type Props = {
  username: string;
  email: string;
};

export default function UpdateProfileForm({ username, email }: Props) {
  const [state, action] = useActionState(updateProfile, undefined);

  return (
    <form action={action} className="flex flex-col gap-6 max-w-xl mx-auto w-full">
      <input id="username" name="username" type="text" defaultValue={username} aria-label="Nom d'utilisateur" className="border border-(--main-purple) rounded-lg h-12 px-3" />

      <input id="email" name="email" type="email" defaultValue={email} aria-label="Adresse e-mail" className="border border-(--main-purple) rounded-lg h-12 px-3" />
      <input id="password" name="password" type="password" placeholder="mot de passe" aria-label="Mot de passe actuel" className="border border-(--main-purple) rounded-lg h-12 px-3" />

      {state?.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
      {state?.success && <p className="text-green-500 text-sm text-center">Profil mis à jour</p>}

      <button type="submit" className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">Sauvegarder</button>
    </form>
  );
}
