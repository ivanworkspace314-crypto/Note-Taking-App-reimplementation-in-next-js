import NoteEditor from "../../../components/NoteEditor";
import { getNoteById } from "../../../lib/api";

export const dynamic = "force-dynamic";

export default async function NoteDetailPage({ params }) {
  let note = null;
  let errorMessage = null;

  try {
    note = await getNoteById(params.id);
  } catch (error) {
    console.error("Error fetching note:", error);
    errorMessage = "Failed to load note";
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <p className="text-error text-lg">{errorMessage}</p>
      </div>
    );
  }

  return (
    <NoteEditor
      pageTitle="Edit Note"
      isNoteDetailPage={true}
      noteId={params.id}
      initialTitle={note?.title || ""}
      initialContent={note?.content || ""}
    />
  );
}
