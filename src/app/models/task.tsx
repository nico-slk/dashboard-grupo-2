import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    }
}, {
    timestamps: true,
})

export default models.Task || model('Task', taskSchema)
