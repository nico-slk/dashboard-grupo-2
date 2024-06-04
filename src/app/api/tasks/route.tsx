import { connectDB } from "@/libs/db";
import { NextResponse } from "next/server";
import Task from "@/models/task"; 
import Board from "@/models/board";

export async function GET() {
    connectDB();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
}

export async function POST(request: { json: () => any }) {
    try {
        const data = await request.json();
        const newTask = new Task({ ...data, priority: data.priority || 'Task List' });
        const savedTask = await newTask.save();
        await Board.findByIdAndUpdate(savedTask.board, { $push: { tasks: savedTask._id } });

        return NextResponse.json(savedTask, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}