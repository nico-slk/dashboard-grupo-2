import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/mongoose";
import Task from "@/app/models/task";

interface Params {
  taskId: string;
}

export async function GET(request: any, { params }: { params: Params }) {
  connectToDatabase();
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

export async function DELETE(request: any, { params }: { params: Params }) {
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

export async function PUT(request: any, { params }: { params: Params }) {
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
