import mongoose, { Schema, Document } from 'mongoose';

interface IBoard extends Document {
    title: string;
    description: string;
    tasks: mongoose.Types.ObjectId[];
}

const BoardSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

export default mongoose.models.Board || mongoose.model<IBoard>('Board', BoardSchema);

