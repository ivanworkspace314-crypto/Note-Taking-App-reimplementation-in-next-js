import NavBar from "../components/NavBar";
import NoteBoard from "../components/NoteBoard";
import { getNotes } from "../lib/api-server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let notes = [];
  let errorMessage = null;

  try {
    notes = await getNotes();
  } catch (error) {
    console.error("Error fetching notes:", error);
    errorMessage = "Failed to load notes";
  }

  return (
    <div className="min-h-screen bg-base-100">
      <NavBar />
      {errorMessage ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-error text-lg">{errorMessage}</p>
        </div>
      ) : (
        <NoteBoard notes={notes} />
      )}
    </div>
  );
}
