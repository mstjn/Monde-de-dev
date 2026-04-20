"use client"

import { createPost } from "@/lib/actions/articles";
import { Topic } from "@/types";
import { useActionState, useState } from "react";

export default function CreateArticleForm({ topics }: { topics: Topic[] }) {
  const [state, action] = useActionState(createPost, undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form action={action} className="flex flex-col gap-6 max-w-xl mx-auto w-full">
      <div className="flex flex-col gap-1">
        <label htmlFor="topic" className="font-semibold">Thème</label>
        <select id="topic" name="topic" className="border border-(--main-purple) rounded-lg h-12 px-3">
          {topics.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-semibold">Titre</label>
        <input id="title" name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-(--main-purple) rounded-lg h-12 px-3" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-semibold">Contenu</label>
        <textarea id="content" name="content" rows={8} value={content} onChange={e => setContent(e.target.value)} className="border border-(--main-purple) rounded-lg px-3 py-2 resize-none" />
      </div>

      {state?.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}

      <button className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">
        Créer
      </button>
    </form>
  );
}
