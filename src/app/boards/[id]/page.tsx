"use client";
import TaskCard from "@/components/TaskCard";
import { Board } from "@/types/board";
import { Priority } from "@/types/priority";
import { Task } from "@/types/task";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import BoardForm from "../page";
import Link from "next/link";
import styles from "../../styles.module.css";

export default function BoardPage() {
  const params = useParams();
  const boardId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [isTaskExpanded, setIsTaskExpanded] = useState(false);
  const [isPriorityExpanded, setIsPriorityExpanded] = useState(false);

  const handleTaskToggle = () => {
    setIsTaskExpanded(!isTaskExpanded);
  };

  const handlePriorityToggle = () => {
    setIsPriorityExpanded(!isPriorityExpanded);
  };

  const router = useRouter();

  const [boardData, setBoardData] = useState<Board>({
    _id: "",
    title: "",
    createdBy: "",
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

  const predefinedPriorities = useMemo(() => [
    { _id: "default-task-list", title: "Task List" },
    { _id: "default-to-do", title: "To do" },
    { _id: "default-doing", title: "Doing" },
    { _id: "default-done", title: "Done" },
  ], []);

  const [priorities, setPriorities] = useState<string[]>(predefinedPriorities.map((p: { title: string; }) => p.title));

  const { data: session } = useSession();

  const fetchBoard = useCallback(async () => {
    if (boardId) {
      try {
        const res = await fetch(`/api/boards/${boardId}`);
        const data = await res.json();
        if (res.ok) {
          setBoardData(data);
          setPriorities(predefinedPriorities.map((p: { title: string; }) => p.title).concat(data.priorities.map((p: Priority) => p.title)));
        } else {
          console.error("Failed to fetch board data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    }
  }, [boardId, predefinedPriorities]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

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
          title: title,
          boardId: boardId,
          createdBy: session?.user?.email || "",
        }),
      });

      if (response.ok) {
        const newPriority = await response.json();
        setBoardData((prevData) => ({
          ...prevData,
          priorities: [...prevData.priorities, newPriority],
        }));
        setPriorities((prevPriorities) => [
          ...prevPriorities,
          newPriority.title,
        ]);
        router.refresh();
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
    <div className={`flex h-screen ${styles.backgroundContainer}`}>
      <div className="w-1/4">
        <BoardForm />
        <div
          className={`items-center h-screen shadow-md max-w-sm ${
            styles.formContainer
          } ${isPriorityExpanded ? styles.open : ""}`}
        >
          <div className="bg-white">
            <button
              onClick={handlePriorityToggle}
              className={`flex justify-between w-full p-1 ${styles.toggleButton}`}
            >
              <h2 className="text-md font-semibold text-gray-700 mx-2">
                Priority
              </h2>
              <span
                className={`${styles.arrow} ${
                  isPriorityExpanded ? styles.down : styles.right
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
            <form
              onSubmit={handlePrioritySubmit}
              className="space-y-4 mb-4 p-2 bg-gray-200"
            >
              <input
                type="text"
                name="title"
                placeholder="Priority title"
                className="bg-white font-semibold shadow-md text-gray-600 border border-gray-300 px-2 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400 mx-auto"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Add Priority
              </button>
            </form>
          </div>
        </div>

        <div
          className={`items-center h-screen shadow-md bg-white max-w-sm ${
            styles.formContainer
          } ${isTaskExpanded ? styles.open : ""}`}
        >
          <button
            onClick={handleTaskToggle}
            className={`flex justify-between w-full p-1 bg-white ${styles.toggleButton}`}
          >
            <h2 className="text-md font-semibold text-gray-700 mx-2">Tasks</h2>
            <span
              className={`${styles.arrow} ${
                isTaskExpanded ? styles.down : styles.right
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </button>
          <div className="bg-white p-2 rounded-lg shadow-md text-black">
            {/* <h2 className="text-md mb-2 text-gray-700">Tasks</h2> */}
            <form onSubmit={handleTaskSubmit} className="space-y-4 mb-4 w-full">
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleTaskChange}
                value={taskData.title}
                className="bg-gray-200 font-semibold text-gray-600 border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400"
              />
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleTaskChange}
                value={taskData.description}
                className="bg-gray-200 font-semibold text-gray-600 border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-gray-400"
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
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto bg-white p-8 rounded-lg shadow-md m-8 text-black">
        <div className={`flex mx-auto whitespace-nowrap gap-4 min-h-[450px]`}>
          {predefinedPriorities.map((priority) => (
            <div
              key={priority._id}
              onDrop={(e) => handleDrop(e, priority.title)}
              onDragOver={(e) => e.preventDefault()}
              className="p-4 bg-gray-100 rounded-lg"
              style={{ minWidth: "280px" }}
            >
              <h3 className="font-semibold mb-4 text-gray-700">{priority.title}</h3>
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
          {boardData.priorities.map((priority) => (
            <div
              key={priority._id}
              onDrop={(e) => handleDrop(e, priority.title)}
              onDragOver={(e) => e.preventDefault()}
              className="p-4 bg-gray-100 rounded-lg"
              style={{ minWidth: "280px" }}
            >
              <Link href={`/priority/${priority._id}`}>
                <h3 className="font-semibold mb-4 text-gray-700">{priority.title}</h3>
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
  );
}