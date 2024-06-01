import { connectDB } from '@/libs/db';
import Task from "@/models/task";
import { NextResponse } from "next/server";

interface Params {
  taskId: string;
}

export async function GET(request: any, { params }: { params: Params; }) {
  await connectDB();
  try {
    const taskFound = await Task.findOne({
      _id: params.taskId,
    });
    if (!taskFound) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: any, { params }: { params: Params; }) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(params.taskId);
    if (!taskDeleted)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(taskDeleted);
  } catch (error) {
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: any, { params }: { params: Params; }) {
  try {
    const data = await request.json();
    const taskUpdated = await Task.findByIdAndUpdate(params.taskId, data, {
      new: true,
    });
    return NextResponse.json(taskUpdated);
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
