"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { createComment } from "@/lib/actions/comments";

export function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");

  async function handleSubmit() {
    if (!content.trim()) return;
    await createComment(postId, content);
    setContent("");
  }

  return (
    <div className="flex items-center self-center gap-3 w-full md:w-[80%]">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écrivez ici votre commentaire"
        rows={3}
        aria-label="Contenu du commentaire"
        className="flex-1 border border-black rounded-xl p-3 resize-none text-xl outline-none focus:border-(--main-purple)"
      />
      <button
        onClick={handleSubmit}
        aria-label="Envoyer le commentaire"
        className="mb-1 text-(--main-purple) hover:opacity-70 transition-opacity"
      >
        <Send size={40} aria-hidden="true" />
      </button>
    </div>
  );
}
