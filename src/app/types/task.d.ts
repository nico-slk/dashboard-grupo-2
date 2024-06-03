export interface Task {
    priority: ReactNode;
    _id: string;  
    title: string;
    board: string; 
    description: string;
    createdAt: string; 
    updatedAt: string;  
    __v: number;
  }