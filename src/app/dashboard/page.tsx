import { connectDB } from '@/libs/db';
import Board from '@/models/board';
import BoardCard from "../../components/BoardCard";
import BoardForm from "../boards/page";

async function loadBoards() {
  try {
    await connectDB();
    const boards = await Board.find(); 
    return boards;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function Dashboard() {
  const boards = await loadBoards();
  return (
    <div className='flex flex-col items-center justify-center'>
        <BoardForm />
      <div className="mt-8 grid grid-cols-3 gap-2 min-h-screen">
        {boards.map(board => (
          <BoardCard board={board} key={board._id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
