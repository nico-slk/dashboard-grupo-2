// "use client"
// import { ChangeEvent, FormEvent, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// export default function FormTask(){
//     const router = useRouter();
//     const params = useParams();
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: ""
//     });
//     const getTask = async () => {
//         const res = await fetch(`/api/tasks/${params.id}`);
//         const data = await res.json();
//         setNewTask({
//             title: data.title,
//             description: data.description
//         });
//     }
//     const updateTask = async () => {
//         try {
//         const res = await fetch(`/api/tasks/${params.id}`, {
//             method: "PUT",
//             body: JSON.stringify(newTask),
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         })
//         const data = await res.json();
//         router.push("/dashboard");
//         router.refresh();
//     } catch(error){
//         console.log(error);
//     }
// }
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try{
//             if(!params.id){
//                 const res = await fetch('/api/tasks', {
//                     method: "POST",
//                     body: JSON.stringify(newTask),
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 const data = await res.json();
//                 if(res.status === 200){
//                     // router.push("/dashboard");
//                     router.refresh()
//                 }
//             } else {
//                 updateTask();
//             }
//     }
//     catch(err){
//         console.log(err)
//         }
//     }

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure?")){
//            const res = await fetch(`/api/tasks/${params.id}`, {
//            method: "DELETE",
//            }) 
//            router.push("/dashboard");
//            router.refresh();
//         }
//     }
//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setNewTask({
//             ...newTask, 
//             [e.target.name]: e.target.value
//             });
//     }
//     // useEffect(() => {
//     //     if(!params.id){
//     //         getTask();
//     // }
//     // }, []);
    // return (
    //     <div className="flex justify-center item-center">
    //         <form onSubmit={handleSubmit}>
    //            <h2 className="text-center font-bold">
    //             {
    //                 !params.id ? "Create task" : "Update task"
    //             }
    //             </h2> 
    //             { params.id && <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
    //                 Delete
    //             </button>}
    //             <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'/>
    //             <textarea name="description" placeholder="Description" onChange={handleChange} value={newTask.description} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'></textarea>
    //             <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
    //                 {
    //                     !params.id ? "Create" : "Update"
    //                 }
    //             </button>
    //         </form>
    //     </div>
    // )
// }

// "use client";

// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function FormTask({ boardId }: { boardId: string }) {
//     const router = useRouter();
//     const params = useParams();
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: ""
//     });

//     const getTask = async () => {
//         const res = await fetch(`/api/tasks/${params.id}`);
//         const data = await res.json();
//         setNewTask({
//             title: data.title,
//             description: data.description
//         });
//     }

//     const updateTask = async () => {
//         try {
//             const res = await fetch(`/api/tasks/${params.id}`, {
//                 method: "PUT",
//                 body: JSON.stringify(newTask),
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             })
//             const data = await res.json();
//             router.push(`/boards/${boardId}`);
//             router.refresh();
//         } catch (error) {
//             console.log(error);
//         }
//     }

    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         if (!params.id) {
    //             const res = await fetch('/api/tasks', {
    //                 method: "POST",
    //                 body: JSON.stringify({ ...newTask, board: boardId }),
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             })
    //             const data = await res.json();
    //             if (res.status === 200) {
    //                 router.refresh()
    //             }
    //         } else {
    //             updateTask();
    //         }
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure?")) {
//             const res = await fetch(`/api/tasks/${params.id}`, {
//                 method: "DELETE",
//             })
//             router.push(`/boards/${boardId}`);
//             router.refresh();
//         }
//     }

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setNewTask({
//             ...newTask,
//             [e.target.name]: e.target.value
//         });
//     }

//     // useEffect(() => {
//     //     if (params.id) {
//     //         getTask();
//     //     }
//     // }, []);

//     return (
//         <div className="flex justify-center item-center">
//             <form onSubmit={handleSubmit}>
//                 <h2 className="text-center font-bold">
//                     {
//                         params.id ? "Create task" : "Update task"
//                     }
//                 </h2>
//                 {!params.id && <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
//                     Delete
//                 </button>}
//                 <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2' />
//                 <textarea name="description" placeholder="Description" onChange={handleChange} value={newTask.description} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'></textarea>
//                 <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
//                     {
//                         params.id ? "Create" : "Update"
//                     }
//                 </button>
//             </form>
//         </div>
//     )
// }

// "use client";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function FormTask({ boardId }: { boardId: string }) {
//     const router = useRouter();
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: "",
//         board: boardId
//     });

//     const createTask = async () => {
//         try {
//             const res = await fetch('/api/tasks', {
//                 method: "POST",
//                 body: JSON.stringify(newTask),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             if (res.ok) {
//                 router.refresh();
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         await createTask();
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setNewTask({
//             ...newTask,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <div className="flex justify-center items-center mt-8">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <h2 className="text-center font-bold">Create Task</h2>
//                 <input 
//                     type="text" 
//                     name="title" 
//                     placeholder="Title" 
//                     onChange={handleChange} 
//                     value={newTask.title} 
//                     className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//                 />
//                 <textarea 
//                     name="description" 
//                     placeholder="Description" 
//                     onChange={handleChange} 
//                     value={newTask.description} 
//                     className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//                 />
//                 <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
//                     Create Task
//                 </button>
//             </form>
//         </div>
//     );
// }


// "use client";

// import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function FormTask({ boardId }: { boardId: string }) {
//     const router = useRouter();
//     const params = useParams();
//     const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: ""
//     });

//     const getTask = useCallback(async () => {
//         if (taskId) {
//             const res = await fetch(`/api/tasks/${taskId}`);
//             const data = await res.json();
//             setNewTask({
//                 title: data.title,
//                 description: data.description
//             });
//         }
//     }, [taskId]);

//     const updateTask = async () => {
//         try {
//             const res = await fetch(`/api/tasks/${taskId}`, {
//                 method: "PUT",
//                 body: JSON.stringify(newTask),
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });
//             if (res.ok) {
//                 if (boardId) {
//                     router.push(`/boards/${boardId}`);
//                 } else {
//                     router.back();
//                 }
//                 router.refresh();
//             } else {
//                 throw new Error('Failed to update task');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             if (!taskId) {
//                 const res = await fetch('/api/tasks', {
//                     method: "POST",
//                     body: JSON.stringify({ ...newTask, board: boardId }),
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 if (res.ok) {
//                     router.refresh();
//                 } else {
//                     throw new Error('Failed to create task');
//                 }
//             } else {
//                 await updateTask();
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure?")) {
//             const res = await fetch(`/api/tasks/${taskId}`, {
//                 method: "DELETE",
//             });
//             if (res.ok) {
//                 if (boardId) {
//                     router.push(`/boards/${boardId}`);
//                 } else {
//                     router.back();
//                 }
//                 router.refresh();
//             } else {
//                 throw new Error('Failed to delete task');
//             }
//         }
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setNewTask({
//             ...newTask,
//             [e.target.name]: e.target.value
//         });
//     };

//     useEffect(() => {
//         if (taskId) {
//             getTask();
//         }
//     }, [taskId, getTask]);

//     return (
//         <div className="flex justify-center items-center mt-8">
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <h2 className="text-center font-bold">
//                     {taskId ? "Update Task" : "Create Task"}
//                 </h2>
//                 {!taskId && (
//                     <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
//                         Delete
//                     </button>
//                 )}
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     onChange={handleChange}
//                     value={newTask.title}
//                     className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//                 />
//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     onChange={handleChange}
//                     value={newTask.description}
//                     className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//                 />
//                 <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
//                     {taskId ? "Update Task" : "Create Task"}
//                 </button>
//             </form>
//         </div>
//     );
// }


// "use client";

// import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
// import { useRouter, useParams } from "next/navigation";

// export default function FormTask({ boardId }: { boardId: string }) {
//     const router = useRouter();
//     const params = useParams();
//     const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
//     const [newTask, setNewTask] = useState({
//         title: "",
//         description: ""
//     });

//     const getTask = useCallback(async () => {
//         if (taskId) {
//             const res = await fetch(`/api/tasks/${taskId}`);
//             const data = await res.json();
//             setNewTask({
//                 title: data.title,
//                 description: data.description
//             });
//         }
//     }, [taskId]);

//     const updateTask = async () => {
//         try {
//             const res = await fetch(`/api/tasks/${taskId}`, {
//                 method: "PUT",
//                 body: JSON.stringify(newTask),
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             });
//             if (res.ok) {
//                 if (boardId) {
//                     router.push(`/boards/${boardId}`);
//                 } else {
//                     router.back();
//                 }
//                 router.refresh();
//             } else {
//                 throw new Error('Failed to update task');
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // const handleSubmit = async (e: FormEvent) => {
//     //     e.preventDefault();
//     //     try {
//     //         if (!taskId) {
//     //             const res = await fetch('/api/tasks', {
//     //                 method: "POST",
//     //                 body: JSON.stringify({ ...newTask, board: boardId }),
//     //                 headers: {
//     //                     "Content-Type": "application/json"
//     //                 }
//     //             });
//     //             if (res.ok) {
//     //                 router.refresh();
//     //             } else {
//     //                 throw new Error('Failed to create task');
//     //             }
//     //         } else {
//     //             await updateTask();
//     //         }
//     //     } catch (err) {
//     //         console.log(err);
//     //     }
//     // };
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             if (params.id) {
//                 const res = await fetch('/api/tasks', {
//                     method: "POST",
//                     body: JSON.stringify({ ...newTask, board: boardId }),
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 const data = await res.json();
//                 if (res.status === 200) {
//                     router.refresh()
//                 }
//             } else {
//                 updateTask();
//             }
//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure?")) {
//             const res = await fetch(`/api/tasks/${taskId}`, {
//                 method: "DELETE",
//             });
//             if (res.ok) {
//                 if (boardId) {
//                     router.push(`/boards/${boardId}`);
//                 } else {
//                     router.back();
//                 }
//                 router.refresh();
//             } else {
//                 throw new Error('Failed to delete task');
//             }
//         }
//     };

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setNewTask({
//             ...newTask,
//             [e.target.name]: e.target.value
//         });
//     };

//     useEffect(() => {
//         if (taskId) {
//             getTask();
//         }
//     }, [taskId, getTask]);

//     // return (
//     //     <div className="flex justify-center items-center mt-8">
//     //         <form onSubmit={handleSubmit} className="space-y-4">
//     //             <h2 className="text-center font-bold">
//     //                 {!taskId ? "Update Task" : "Create Task"}
//     //             </h2>
//     //             {taskId && (
//     //                 <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
//     //                     Delete
//     //                 </button>
//     //             )}
//     //             <input
//     //                 type="text"
//     //                 name="title"
//     //                 placeholder="Title"
//     //                 onChange={handleChange}
//     //                 value={newTask.title}
//     //                 className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//     //             />
//     //             <textarea
//     //                 name="description"
//     //                 placeholder="Description"
//     //                 onChange={handleChange}
//     //                 value={newTask.description}
//     //                 className='bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full'
//     //             />
//     //             <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
//     //                 {!taskId ? "Update Task" : "Create Task"}
//     //             </button>
//     //         </form>
//     //     </div>
//     // );
//     return (
//         <div className="flex justify-center item-center">
//             <form onSubmit={handleSubmit}>
//                <h2 className="text-center font-bold">
//                 {
//                     params.id ? "Create task" : "Update task"
//                 }
//                 </h2> 
//                 { !params.id && <button type="button" onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
//                     Delete
//                 </button>}
//                 <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'/>
//                 <textarea name="description" placeholder="Description" onChange={handleChange} value={newTask.description} className='bg-gray-400 border-6 w-full p-4 rounded-lg my-2'></textarea>
//                 <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg">
//                     {
//                         params.id ? "Create" : "Update"
//                     }
//                 </button>
//             </form>
//         </div>
//     )
// }
