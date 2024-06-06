import { NextResponse } from 'next/server';
import Priority from '@/models/priority';
import Board from '@/models/board';
import { connectDB } from '@/libs/db';

export async function GET() {
    await connectDB();
    try {
        const boardsWithPriorities = await Board.find().populate('priorities');
        return NextResponse.json(boardsWithPriorities);
    } catch (error: any) {
        console.error("Error fetching boards with priorities:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request: { json: () => any }) {
    await connectDB();

    try {
        const data = await request.json();
        const { title, boardId, createdBy } = data;

        if (!title || !boardId || !createdBy) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const newPriority = new Priority({ title, board: boardId, createdBy });
        const savedPriority = await newPriority.save();

        await Board.findByIdAndUpdate(boardId, { $push: { priorities: savedPriority._id } });

        return NextResponse.json(savedPriority, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    } 
}
