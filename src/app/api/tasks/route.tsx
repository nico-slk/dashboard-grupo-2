import { connectToDatabase } from "@/app/utils/mongoose"
import { NextResponse } from "next/server"
import Task from "@/app/models/task" 
export async function GET() {
    connectToDatabase()
    const tasks = await Task.find()
    return NextResponse.json(
        tasks
    )
}

export async function POST(request: { json: () => any }) {
    try {
        const data = await request.json()
        const newTask = new Task(data)
        // Guardado en Mongodb
        const savedTask = await newTask.save()
        console.log(savedTask)
        return NextResponse.json(savedTask) 
    } catch(error: any){
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}