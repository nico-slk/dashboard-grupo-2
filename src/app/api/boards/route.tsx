import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import Board from "@/models/board";
import { getSession } from "next-auth/react";

export async function GET(req: any) {
  await connectDB();

  try {
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const createdBy = session.user?.email;
    const boards = await Board.find({ createdBy }).populate('tasks').populate('priorities');
    return NextResponse.json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: { json: () => any }) {
    try {
        const data = await request.json();
        const newBoard = new Board(data);
        const savedBoard = await newBoard.save();
        return NextResponse.json(savedBoard); 
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}