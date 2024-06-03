import { Task } from "./task";

export interface Board {
    _id: string;
    title: string;
    tasks: Task[]; 
    description: string;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
