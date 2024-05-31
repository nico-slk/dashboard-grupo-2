"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useParams } from "next/navigation";
export default function FormTask(){
    const router = useRouter();
    const params = useParams();
    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });
    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        setNewTask({
            title: data.title,
            description: data.description
        });
    }
    const updateTask = async () => {
        try {
        const res = await fetch(`/api/tasks/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json();
        router.push("/dashboard");
        router.refresh();
    } catch(error){
        console.log(error);
    }
}
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try{
            if(!params.id){
                const res = await fetch('/api/tasks', {
                    method: "POST",
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json();
                if(res.status === 200){
                    // router.push("/dashboard");
                    router.refresh()
                }
            } else {
                updateTask();
            }
    }
    catch(err){
        console.log(err)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure?")){
           const res = await fetch(`/api/tasks/${params.id}`, {
           method: "DELETE",
           }) 
           router.push("/dashboard");
           router.refresh();
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTask({
            ...newTask, 
            [e.target.name]: e.target.value
            });
    }
    // useEffect(() => {
    //     if(!params.id){
    //         getTask();
    // }
    // }, []);
    return (
        <div className="flex justify-center item-center">
            <form onSubmit={handleSubmit}>
               <h2 className="text-center font-bold">
                {
                    !params.id ? "Create task" : "Update task"
                }
                </h2> 
                { params.id && <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
                    Delete
                </button>}
                <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'/>
                <textarea name="description" placeholder="Description" onChange={handleChange} value={newTask.description} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'></textarea>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
                    {
                        !params.id ? "Create" : "Update"
                    }
                </button>
            </form>
        </div>
    )
}