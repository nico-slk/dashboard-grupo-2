import { connectDB } from '@/libs/db';
import TaskCard from "../../components/TaskCard";
import Task from "../../models/task";
import FormTask from "../tasks/page";

async function loadTasks() {
  await connectDB();
  const tasks = await Task.find();
  return tasks;
}
async function Dashboard() {
  const tasks = await loadTasks();
  return (
    <div>
      <FormTask />
      <h3>Dashboard</h3>
      <div className="grid grid-cols-3 gap-2">
        {tasks.map(task => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
