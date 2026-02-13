"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { deleteNote } from "../lib/api";

const Note = ({ noteID, date, title, body }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNote(noteID);
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="bg-base-200 rounded-lg p-4 shadow-sm h-40 flex flex-col justify-between m-2 border border-white">
      <h3 className="text-lg font-bold text-base-content truncate">{title}</h3>
      <p className="text-sm text-base-content/80 flex-1 overflow-hidden line-clamp-3">
        {body}
      </p>
      <div className="flex items-center justify-between text-sm">
        <span>{date}</span>
        <div className="flex gap-2">
          <Link href={`/note/${noteID}`} className="btn btn-sm btn-primary">
            <Edit size={16} />
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error"
            type="button"
            disabled={isDeleting}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Note;
