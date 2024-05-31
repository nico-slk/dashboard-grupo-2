import { connectToDatabase } from "../utils/mongoose";
import Task from "../models/task";
import TaskCard from "../components/TaskCard";
import FormTask from "../tasks/page";

async function loadTasks() {
  connectToDatabase()
  const tasks = await Task.find()
  return tasks
}
async function Dashboard(){
  const tasks = await loadTasks()
  return (
    <div>
    <FormTask />
    <h3>Dashboard</h3>
    <div className="grid grid-cols-3 gap-2">
        {tasks.map(task => (
           <TaskCard task={task} key={task._id}/>
        ))}
    </div>
</div>
  );
};

export default Dashboard;
