import { Task } from "./task";
export interface Board {
    createdBy: ReactNode;
    _id: string;
    title: string;
    tasks: Task[]; 
    priorities: Priority[],
    description: string;
    tasks: Task[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}