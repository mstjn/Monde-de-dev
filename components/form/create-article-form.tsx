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
        {state?.errors?.topicId && <p className="text-red-500 text-sm">{state.errors.topicId[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-semibold">Titre</label>
        <input id="title" name="title" type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-(--main-purple) rounded-lg h-12 px-3" />
        {state?.errors?.title && <p className="text-red-500 text-sm">{state.errors.title[0]}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-semibold">Contenu</label>
        <textarea id="content" name="content" rows={8} value={content} onChange={e => setContent(e.target.value)} className="border border-(--main-purple) rounded-lg px-3 py-2 resize-none" />
        {state?.errors?.content && <p className="text-red-500 text-sm">{state.errors.content[0]}</p>}
      </div>

      <button className="self-center h-10 w-35 rounded-lg font-bold text-white bg-(--main-purple)">
        Créer
      </button>
    </form>
  );
}
