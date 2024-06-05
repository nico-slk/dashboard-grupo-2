"use client";

import TaskCard from "@/components/TaskCard";
import { Board } from "@/types/board";
import { Task } from "@/types/task";
import { useSession } from 'next-auth/react';
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import BoardForm from "../page";

export default function BoardPage() {
    const params = useParams();
    const boardId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [boardData, setBoardData] = useState<Board>({
        _id: '',
        title: "",
        description: "",
        tasks: [],
        createdAt: "",
        updatedAt: "",
        __v: 0
    });

    const [taskData, setTaskData] = useState<Omit<Task, '_id' | 'board' | 'createdAt' | 'updatedAt' | '__v'>>({
        title: "",
        description: "",
        priority: "Task List",
        createdBy: ""
    });

    const { data: session, status } = useSession();

    const fetchBoard = useCallback(async () => {
        if (boardId) {
            try {
                const res = await fetch(`/api/boards/${boardId}`);
                const data = await res.json();
                if (res.ok) {
                    setBoardData(data);
                } else {
                    console.error("Failed to fetch board data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        }
    }, [boardId]);

    const fetchTasks = useCallback(async () => {
        if (boardId) {
            try {
                const res = await fetch(`/api/boards/${boardId}/tasks`);
                const tasks = await res.json();
                if (res.ok) {
                    setBoardData((prevData) => ({
                        ...prevData,
                        tasks: tasks
                    }));
                } else {
                    console.error("Failed to fetch tasks:", tasks.message);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }
    }, [boardId]);

    const handleTaskSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!taskData.title.trim() || !taskData.description.trim()) {
            alert("Please fill in both the title and description.");
            return;
        }
        try {
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify({ ...taskData, board: boardId, createdBy: session?.user?.email || "" }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            if (res.ok) {
                setBoardData((prevData) => ({
                    ...prevData,
                    tasks: [...prevData.tasks, data]
                }));
                setTaskData({ title: "", description: "", priority: "Task List", createdBy: "" });
            } else {
                throw new Error('Failed to create task');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleTaskChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    const handleDrop = async (e: React.DragEvent, newPriority: string) => {
        const taskId = e.dataTransfer.getData("text");
        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify({ priority: newPriority }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const updatedTask = await res.json();
                setBoardData((prevData) => ({
                    ...prevData,
                    tasks: prevData.tasks.map((task) =>
                        task._id === taskId ? updatedTask : task
                    )
                }));
            } else {
                throw new Error('Failed to update task priority');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData("text", taskId);
    };

    useEffect(() => {
        fetchBoard();
        fetchTasks();
    }, [fetchBoard, fetchTasks]);

    return (
        <div>
            <BoardForm />

            <div className="bg-white p-8 rounded-lg shadow-md m-8 text-black">
                <h2 className="text-2xl mb-4">Tasks</h2>
                <form onSubmit={handleTaskSubmit} className="space-y-4 mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleTaskChange}
                        value={taskData.title}
                        className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleTaskChange}
                        value={taskData.description}
                        className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
                    />
                    <select
                        name="priority"
                        value={taskData.priority}
                        onChange={handleTaskChange}
                        className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full"
                    >
                        <option value="Task List">Task List</option>
                        <option value="Urgent">Urgent</option>
                        <option value="In Process">In Process</option>
                        <option value="Done">Done</option>
                    </select>
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
                        Create Task
                    </button>
                </form>

                <div className="grid grid-cols-4 gap-4 min-h-[800px] ">
                    {['Task List', 'Urgent', 'In Process', 'Done'].map((priority) => (
                        <div
                            key={priority}
                            onDrop={(e) => handleDrop(e, priority)}
                            onDragOver={(e) => e.preventDefault()}
                            className="p-4 bg-gray-100 rounded-lg"
                        >
                            <h3 className="text-xl mb-2">{priority}</h3>
                            {boardData.tasks
                                .filter((task) => task.priority === priority)
                                .map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onDragStart={(e) => handleDragStart(e, task._id)}
                                        draggable
                                    />
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
