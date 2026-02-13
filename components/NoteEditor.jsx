"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "./PageHeader";
import FormField from "./FormField";
import Button from "./Buttons/Button";
import { createNote, deleteNote, updateNote } from "../lib/api";

const NoteEditor = ({
  pageTitle,
  noteId,
  isNoteDetailPage = false,
  initialTitle = "",
  initialContent = "",
}) => {
  const router = useRouter();
  const [titleInput, setTitleInput] = useState(initialTitle);
  const [contentInput, setContentInput] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      await createNote({ title: titleInput, content: contentInput });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      await updateNote(noteId, { title: titleInput, content: contentInput });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error updating note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNote(noteId);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <PageHeader
          backLink="/"
          backText="Back to Notes"
          haveDeleteButton={isNoteDetailPage}
          deleteOnclick={handleDelete}
        >
          {pageTitle}
        </PageHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Title"
            type="text"
            placeholder="Enter note title..."
            onChange={(event) => setTitleInput(event.target.value)}
            inputValue={titleInput}
            required
          />

          <FormField
            label="Content"
            type="textarea"
            placeholder="Enter note content..."
            onChange={(event) => setContentInput(event.target.value)}
            inputValue={contentInput}
            required
          />

          {isNoteDetailPage ? (
            <Button
              onClick={handleUpdate}
              type="submit"
              disabled={isSaving || isDeleting}
            >
              Save Note
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              type="submit"
              disabled={isSaving || isDeleting}
            >
              Create New Note
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
