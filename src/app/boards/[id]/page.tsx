"use client";
import TaskCard from "@/components/TaskCard";
import { Board } from "@/types/board";
import { Priority } from "@/types/priority";
import { Task } from "@/types/task";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PriorityProps {
  priority: Priority;
}

export default function BoardPage({ priority }: PriorityProps) {
  const params = useParams();
  const boardId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [boardData, setBoardData] = useState<Board>({
    _id: "",
    title: "",
    description: "",
    tasks: [],
    priorities: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [taskData, setTaskData] = useState<
    Omit<Task, "_id" | "board" | "createdAt" | "updatedAt" | "__v">
  >({
    title: "",
    description: "",
    priority: "Task List",
    createdBy: "",
  });

  const [priorities, setPriorities] = useState<string[]>([
    "Task List",
    "To do",
    "Doing",
    "Done",
  ]);

  const [colData, setColData] = useState<
    Omit<Priority, "board" | "createdAt" | "updatedAt" | "__v">
  >({
    _id: "",
    title: "",
    priority: priorities,
    createdBy: "",
  });

  const { data: session } = useSession();

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
            tasks: tasks,
          }));
        } else {
          console.error("Failed to fetch tasks:", tasks.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  }, [boardId]);

  const fetchPriorities = useCallback(async () => {
    if (boardId) {
      try {
        const res = await fetch(`/api/boards/${boardId}/priorities`);
        const data = await res.json();
        if (res.ok) {
          setColData(data);
        } else {
          console.error("Failed to fetch priorities:", data.message);
        }
      } catch (error) {
        console.error("Error fetching priorities:", error);
      }
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoard();
    fetchTasks();
    fetchPriorities();
  }, [fetchBoard, fetchTasks, fetchPriorities]);

  const handleTaskSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!taskData.title.trim() || !taskData.description.trim()) {
      alert("Please fill in both the title and description.");
      return;
    }
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          ...taskData,
          board: boardId,
          createdBy: session?.user?.email || "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setBoardData((prevData) => ({
          ...prevData,
          tasks: [...prevData.tasks, data],
        }));
        setTaskData({
          title: "",
          description: "",
          priority: "Task List",
          createdBy: "",
        });
      } else {
        throw new Error("Failed to create task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDrop = async (e: React.DragEvent, newPriority: string) => {
    const taskId = e.dataTransfer.getData("text");
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ priority: newPriority }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const updatedTask = await res.json();
        setBoardData((prevData) => ({
          ...prevData,
          tasks: prevData.tasks.map((task) =>
            task._id === taskId ? updatedTask : task
          ),
        }));
      } else {
        throw new Error("Failed to update task priority");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text", taskId);
  };

  const handlePrioritySubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get("title") as string;

    if (!title.trim()) {
      alert("Priority title cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/priority", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...colData,
          title: title,
          boardId: boardId,
          createdBy: session?.user?.email || "",
        }),
      });

      if (response.ok) {
        const newPriority = await response.json();
        setPriorities((prevPriorities) => [
          ...prevPriorities,
          newPriority.title,
        ]);
        form.reset();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to create priority");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the priority");
    }
  };

  return (
    <div className='flex flex-col items-center  w-full  min-w-[600px]'>
      {/* <BoardForm /> */}
      <div className="bg-white p-8 rounded-lg shadow-md m-8 text-black w-full max-w-[800px]">
        <h2 className="text-2xl mb-4">Add New Priority</h2>
        <form onSubmit={handlePrioritySubmit} className="space-y-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Priority Title"
            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full  focus:outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg"
          >
            Add Priority
          </button>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md m-8 text-black w-full max-w-[800px]" >
        <h2 className="text-2xl mb-4">Tasks</h2>
        <form onSubmit={handleTaskSubmit} className="space-y-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleTaskChange}
            value={taskData.title}
            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleTaskChange}
            value={taskData.description}
            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400"
          />
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleTaskChange}
            className="bg-gray-200 border border-gray-300 px-4 py-2 rounded-lg w-full  focus:outline-none focus:border-gray-400"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-lg"
          >
            Create Task
          </button>
        </form>
        <div className="flex overflow-x-auto w-full">
          <div className={`flex mx-auto whitespace-nowrap gap-4 min-h-[600px]`}>
            {priorities.map((priority) => (
              <div
                key={priority}
                onDrop={(e) => handleDrop(e, priority)}
                onDragOver={(e) => e.preventDefault()}
                className="p-4 bg-gray-100 rounded-lg"
                style={{ minWidth: "280px" }}
              >
                <h3 className="text-md mb-2 text-gray-700">{priority}</h3>

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
            {boardData.priorities.map((priority) => (
              <div
                key={priority._id}
                onDrop={(e) => handleDrop(e, priority.title)}
                onDragOver={(e) => e.preventDefault()}
                className="p-4 bg-gray-100 rounded-lg"
                style={{ minWidth: "280px" }}
              >
                <Link href={`/priority/${priority._id}`}>
                  <h3 className="text-md mb-2 text-gray-700">
                    {priority.title}
                  </h3>
                </Link>
                {boardData.tasks
                  .filter((task) => task.priority === priority.title)
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
    </div>
  );
}
