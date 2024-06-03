import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongoose';
import Board from '@/app/models/board';
import Task from '@/app/models/task';

export async function GET(request: any, { params }: { params: { boardId: string } }) {
    connectToDatabase();
    try {
        const board = await Board.findById(params.boardId).populate('tasks');
        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }
        return NextResponse.json(board);
    } catch (error) {
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}


export async function POST(request: { json: () => any }) {
    connectToDatabase();
    try {
        const data = await request.json();
        const newTask = new Task(data);
        const savedTask = await newTask.save();

        await Board.findByIdAndUpdate(savedTask.board, { $push: { tasks: savedTask._id } });

        return NextResponse.json(savedTask, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 400 });
    }
}

export async function PUT(request: any, { params }: { params : { boardId: string } }) {
    connectToDatabase();
    try {
        const data = await request.json();
        const boardUpdated = await Board.findByIdAndUpdate(params.boardId, data, {
            new: true,
        });
        return NextResponse.json(boardUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message, {
            status: 400,
        });
    }
}

export async function DELETE(request: any, { params }: { params: { boardId: string }}) {
    connectToDatabase();
    try {
        const boardDeleted = await Board.findByIdAndDelete(params.boardId);
        if (!boardDeleted) {
            return NextResponse.json(
                { message: "Board not found" },
                { status: 404 }
            );
        }

        await Task.deleteMany({ board: params.boardId });

        return NextResponse.json(boardDeleted);
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

