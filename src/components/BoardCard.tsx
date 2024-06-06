
import { Board } from "@/types/board";
import { useTranslations } from 'next-intl';
import Link from "next/link";

interface BoardCardProps {
    board: Board;
}

export default function BoardCard({ board }: BoardCardProps) {
    const translation = useTranslations('dashboard');
    return (
        <Link href={`/boards/${board._id}`}>
            <div className="hover:cursor-pointer bg-gray-600">
                <h3>{board.title}</h3>
                <h3>{board.description}</h3>
                <p>{translation('createdAt')}: {new Date(board.createdAt).toLocaleDateString()}</p>
            </div>
        </Link>

    );
}
