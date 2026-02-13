import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../lib/db";
import Note from "../../../../models/Note";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ message: "Invalid note id" }, { status: 400 });
    }

    const note = await Note.findById(params.id);

    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    await connectToDatabase();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ message: "Invalid note id" }, { status: 400 });
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDatabase();

    if (!isValidObjectId(params.id)) {
      return NextResponse.json({ message: "Invalid note id" }, { status: 400 });
    }

    const deletedNote = await Note.findByIdAndDelete(params.id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(deletedNote);
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
