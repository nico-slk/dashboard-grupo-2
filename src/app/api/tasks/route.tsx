import { connectToDatabase } from "@/app/utils/mongoose";
import { NextResponse } from "next/server";
import Task from "@/app/models/task"; 
import Board from "@/app/models/board";

export async function GET() {
    connectToDatabase();
    const tasks = await Task.find();
    return NextResponse.json(tasks);
}

export async function POST(request: { json: () => any }) {
    try {
        const data = await request.json();
        const newTask = new Task({ ...data, priority: data.priority || 'Task List' });
        // const newTask = new Task(data);
        const savedTask = await newTask.save();

        // Actualiza el board para agregar la nueva tarea
        await Board.findByIdAndUpdate(savedTask.board, { $push: { tasks: savedTask._id } });

        return NextResponse.json(savedTask, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}

