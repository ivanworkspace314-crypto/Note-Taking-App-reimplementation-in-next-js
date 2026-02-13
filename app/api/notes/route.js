import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db";
import Note from "../../../models/Note";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectToDatabase();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const note = await Note.create({ title, content });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
