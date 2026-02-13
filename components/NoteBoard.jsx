import Note from "./Note";

const NoteBoard = ({ notes }) => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="sr-only">Notes</h2>
      <section
        aria-label="notes"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {notes.map((note) => {
          const displayDate = note.createdAt
            ? new Date(note.createdAt).toLocaleDateString("en-US", {
                timeZone: "UTC",
              })
            : "";

          return (
          <Note
            key={note._id}
            noteID={note._id}
            date={displayDate}
            title={note.title}
            body={note.content}
          />
          );
        })}
      </section>
    </main>
  );
};

export default NoteBoard;
