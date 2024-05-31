import { connectDB } from '@/libs/db';
import Task from "@/models/task";
import { NextResponse } from "next/server";
export async function GET() {
    await connectDB();
    const tasks = await Task.find();
    return NextResponse.json(
        tasks
    );
}

export async function POST(request: { json: () => any; }) {
    try {
        const data = await request.json();
        const newTask = new Task(data);
        // Guardado en Mongodb
        const savedTask = await newTask.save();
        console.log(savedTask);
        return NextResponse.json(savedTask);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400
        });
    }
}
