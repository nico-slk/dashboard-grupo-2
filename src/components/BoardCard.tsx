
import { Board } from "@/types/board";
import Link from "next/link";

interface BoardCardProps {
    board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
    return (
        <Link href={`/boards/${board._id}`} passHref>
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 hover:cursor-pointer">
            <h3 className="text-2xl font-semibold text-gray-800">{board.title}</h3>
            <p className="text-gray-600 mt-2">{board.description}</p>
            <p className="text-sm text-gray-500 mt-4">
                Created at: {new Date(board.createdAt).toLocaleDateString()}
            </p>
        </div>
    </Link>
    );
}
