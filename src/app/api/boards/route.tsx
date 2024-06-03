import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import Board from "@/models/board";

export async function GET() {
    connectDB();
    const boards = await Board.find().populate('tasks');
    return NextResponse.json(boards);
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