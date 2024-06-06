"use client";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from 'next-auth/react';
import styles from "../styles.module.css";

export default function BoardForm() {
    const router = useRouter();
    const params = useParams();
    const boardId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const [boardData, setBoardData] = useState({
        title: "",
        description: "",
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

    useEffect(() => {
        fetchBoard();
    }, [fetchBoard]);

    useEffect(() => {
        if (session) {
            setBoardData(prevData => ({
                ...prevData,
                createdBy: session.user?.email  || ''
            }));
        }
    }, [session]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBoardData({
            ...boardData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(boardId ? `/api/boards/${boardId}` : '/api/boards', {
                method: boardId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...boardData })
            });
            if (response.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                throw new Error(`Failed to ${boardId ? 'update' : 'create'} board`);
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
        <div>
        <div className={`flex flex-col items-center h-screen bg-white shadow-md max-w-lg ${styles.formContainer} ${isExpanded ? styles.open : ''}`}>
        <button onClick={handleToggle} className={`flex justify-between w-full p-1 ${styles.toggleButton}`}>
        <h2 className="text-gray-700">{!boardId ? "Create Board" : "Update Board"}</h2>
        <span className={`${styles.arrow} ${isExpanded ? styles.down : styles.right}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
</span>
        </button>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={boardData.title}
                        onChange={handleChange}
                        className="bg-gray-200 border border-gray-300 px-4 py-2 w-full focus:outline-none focus:border-gray-400"
                    />
                </div>
                <div>
                    <textarea
                        name="description"
                        placeholder="Descripcion..."
                        value={boardData.description}
                        onChange={handleChange}
                        className="bg-gray-200 border border-gray-300 px-4 py-2 w-full focus:outline-none focus:border-gray-400"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-2 py-1 w-full"
                >
                    {!boardId ? "Create" : "Update"} Board
                </button>
            </form>
            {boardId && (
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 w-full"
                >
                    Delete Board
                </button>
            )}
        </div>
    </div>
    );
}
