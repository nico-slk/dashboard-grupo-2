import React from 'react';
import { Task } from '@/types/task';
import Link from 'next/link';

interface TaskCardProps {
    task: Task;
    onDragStart: (e: React.DragEvent) => void;
    draggable: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, draggable }) => {
    return (
        <Link href={`/tasks/${task._id}`} >
            <div 
                className="bg-white p-4 rounded-lg shadow-md mb-2 cursor-pointer"
                draggable={draggable}
                onDragStart={onDragStart}
            >
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-600">{task.priority}</p>
            </div>
        </Link>
    );
};

export default TaskCard;

