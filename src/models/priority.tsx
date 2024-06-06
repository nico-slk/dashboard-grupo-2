import mongoose, { Schema, Document } from 'mongoose';

interface IPriority extends Document {
    title: string;
    board: mongoose.Types.ObjectId; 
    priority: mongoose.Types.ObjectId; 
    createdBy: string;
}

const PrioritySchema: Schema = new Schema({
    title: { type: String, required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }, 
    createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Priority || mongoose.model<IPriority>('Priority', PrioritySchema);
