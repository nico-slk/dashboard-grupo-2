import { Task } from '@/types/task';
import Link from 'next/link';
import React from 'react';


interface TaskCardProps {
    task: Task;
    onDragStart: (e: React.DragEvent) => void;
    draggable: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, draggable }) => {
    return (
        <Link href={`/tasks/${task._id}`} >
            <div
                className="bg-white p-4 hover:shadow-xl rounded-lg shadow-md mb-2 cursor-pointer"
                draggable={draggable}
                onDragStart={onDragStart}
            >
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className='text-md text-gray-700'>{task.description}</p>
                <p className="text-sm text-gray-600">{task.priority}</p>
            </div>
        </Link>
    );
};

export default TaskCard;
