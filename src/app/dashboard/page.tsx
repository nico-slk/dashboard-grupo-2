import { connectToDatabase } from "../utils/mongoose";
import Board from "../models/board";
import BoardForm from "../boards/page";
import BoardCard from "../components/BoardCard";

async function loadBoards() {
    connectToDatabase()
    const board = await Board.find()
    return board
  }
async function Dashboard(){
  const boards = await loadBoards();
  return (
    <div>
    <h3>Dashboard</h3>
    <BoardForm />
    <br />
    <div className="grid grid-cols-3 gap-2">
        {boards.map(board => (
           <BoardCard board={board} key={board._id}/>
        ))}
    </div>
</div>
  );
};

export default Dashboard;
