"use client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

export default function FormPriority() {
    const router = useRouter();
    const params = useParams();
    const priorityId = Array.isArray(params.id) ? params.id[0] : params.id;
    const [priorityData, setPriorityData] = useState({
        title: "",
    });
    const [error, setError] = useState<string | null>(null);

    const getPriority = useCallback(async () => {
        if (priorityId) {
            try {
                const res = await fetch(`/api/priority/${priorityId}`);
                if (res.status === 404) {
                    setError("Priority not found");
                    return;
                }
                if (!res.ok) {
                    throw new Error("Failed to fetch priority");
                }
                const data = await res.json();
                setPriorityData({
                    title: data.title,
                });
            } catch (error: any) {
                setError(error.message);
            }
        }
    }, [priorityId]);

    const updatePriority = async () => {
        try {
            const res = await fetch(`/api/priority/${priorityId}`, {
                method: "PUT",
                body: JSON.stringify(priorityData),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!res.ok) {
                throw new Error('Failed to update priority');
            }
            router.back();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const createPriority = async () => {
        try {
            const res = await fetch('/api/prioriti', {
                method: "POST",
                body: JSON.stringify({ ...priorityData, board: params.boardId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                throw new Error('Failed to create priority');
            }
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (priorityId) {
            await updatePriority();
        } else {
            await createPriority();
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure?")) {
            try {
                const res = await fetch(`/api/priority/${priorityId}`, {
                    method: "DELETE",
                });
                if (!res.ok) {
                    throw new Error('Failed to delete priority');
                }
                router.back();
                router.refresh();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPriorityData({
            ...priorityData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        if (priorityId) {
            getPriority();
        }
    }, [priorityId, getPriority]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-center items-center mt-8 text-black">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-center font-bold">
                    {priorityId ? "Update Priority" : "Create Priority"}
                </h2>
                {priorityId && (
                    <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
                        Delete
                    </button>
                )}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={priorityData.title}
                    className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400'
                />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
                    {priorityId ? "Update Priority" : "Create Priority"}
                </button>
            </form>
        </div>
    );
}
