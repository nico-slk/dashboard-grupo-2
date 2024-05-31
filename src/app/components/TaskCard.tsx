import Link from "next/link";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps){
    return (
        <Link href={`/tasks/${task._id}`}>
        <div className="hover:cursor-pointer bg-gray-600">
            <h3>{task.title}</h3>
            <h3>{task.description}</h3>
            <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
        </div> 
        </Link>
        
    )
}