"use client";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function BoardForm() {
    const router = useRouter();
    const params = useParams();
    const boardId = Array.isArray(params.id) ? params.id[0] : params.id;

    const [boardData, setBoardData] = useState({
        title: "",
        description: "",
        tasks: []
    });

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

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBoardData({
            ...boardData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!boardId) {
                const response = await fetch('/api/boards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: boardData.title, description: boardData.description })
                });
                if (response.ok) {
                    router.refresh();
                } else {
                    throw new Error('Failed to create board');
                }
            } else {
                const response = await fetch(`/api/boards/${boardId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: boardData.title, description: boardData.description })
                });
                if (response.ok) {
                    router.push('/dashboard');
                    router.refresh();
                } else {
                    throw new Error('Failed to update board');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async () => {
        try {
            if (window.confirm("Are you sure?")) {
                const response = await fetch(`/api/boards/${boardId}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    router.push("/dashboard");
                    router.refresh();
                } else {
                    throw new Error('Failed to delete board');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl mb-4">{!boardId ? "Create Board" : "Update Board"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={boardData.title}
                            onChange={handleChange}
                            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Description:</label>
                        <textarea
                            name="description"
                            value={boardData.description}
                            onChange={handleChange}
                            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg"
                    >
                        {!boardId ? "Create" : "Update"} Board
                    </button>
                </form>
                {boardId && (
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg mt-4"
                    >
                        Delete Board
                    </button>
                )}
            </div>
        </div>
    );
}

