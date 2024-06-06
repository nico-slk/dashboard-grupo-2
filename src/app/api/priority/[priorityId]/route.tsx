import { connectDB } from '@/libs/db';
import { NextResponse } from "next/server";
import Priority from "@/models/priority";

interface Params {
    priorityId: string;
}

export async function GET(request: any, { params }: { params: Params }) {
    connectDB();
    try {
        const priorityFound = await Priority.findOne({ _id: params.priorityId });
        if (!priorityFound) {
            return NextResponse.json({ message: "Priority not found" }, { status: 404 });
        }
        return NextResponse.json(priorityFound);
    } catch (error) {
        return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
    }
}

export async function DELETE(request: any, { params }: { params: Params }) {
    connectDB();
    try {
        const priorityDeleted = await Priority.findByIdAndDelete(params.priorityId);
        if (!priorityDeleted) {
            return NextResponse.json({ message: "Priority not found" }, { status: 404 });
        }
        return NextResponse.json(priorityDeleted);
    } catch (error) {
        return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
    }
}

export async function PUT(request: any, { params }: { params: Params }) {
    connectDB();
    try {
        const data = await request.json();
        const priorityUpdated = await Priority.findByIdAndUpdate(params.priorityId, data, { new: true });
        return NextResponse.json(priorityUpdated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
