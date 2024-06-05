"use client";

import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

export default function FormTask() {
    const router = useRouter();
    const params = useParams();
    const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [taskData, setTaskData] = useState({
        title: "",
        description: ""
    });
    const [error, setError] = useState<string | null>(null);

    const getTask = useCallback(async () => {
        if (taskId) {
            try {
                const res = await fetch(`/api/tasks/${taskId}`);
                if (res.status === 404) {
                    setError("Task not found");
                    return;
                }
                if (!res.ok) {
                    throw new Error("Failed to fetch task");
                }
                const data = await res.json();
                setTaskData({
                    title: data.title,
                    description: data.description
                });
            } catch (error: any) {
                setError(error.message);
            }
        }
    }, [taskId]);

    const updateTask = async () => {
        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: "PUT",
                body: JSON.stringify(taskData),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                throw new Error('Failed to update task');
            }
            router.back();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async () => {
        try {
            const res = await fetch('/api/tasks', {
                method: "POST",
                body: JSON.stringify({ ...taskData, board: params.boardId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                throw new Error('Failed to create task');
            }
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (taskId) {
            await updateTask();
        } else {
            await createTask();
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure?")) {
            try {
                const res = await fetch(`/api/tasks/${taskId}`, {
                    method: "DELETE",
                });
                if (!res.ok) {
                    throw new Error('Failed to delete task');
                }
                router.back();
                router.refresh();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (taskId) {
            getTask();
        }
    }, [taskId, getTask]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-center items-center mt-8  text-black">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-center font-bold">
                    {taskId ? "Update Task" : "Create Task"}
                </h2>
                {taskId && (
                    <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
                        Delete
                    </button>
                )}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={taskData.title}
                    className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={taskData.description}
                    className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
                />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
                    {taskId ? "Update Task" : "Create Task"}
                </button>
            </form>
        </div>
    );
}

