import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/libs/db';
import Board from '@/models/board';
import Task from '@/models/task';
import Priority from '@/models/priority';

export async function GET(request: any, { params }: { params: { boardId: string } }) {
    connectDB(); 

    try {
        const board = await Board.findById(params.boardId).populate('tasks').populate('priorities');

        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }

        return NextResponse.json(board);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}


export async function POST(request: { json: () => any }) {
    connectDB();
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
    connectDB();
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
    connectDB();
    try {
        const boardDeleted = await Board.findByIdAndDelete(params.boardId);
        if (!boardDeleted) {
            return NextResponse.json(
                { message: "Board not found" },
                { status: 404 }
            );
        }

        await Task.deleteMany({ board: params.boardId });
        await Priority.deleteMany({ board: params.boardId})

        return NextResponse.json(boardDeleted);
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

