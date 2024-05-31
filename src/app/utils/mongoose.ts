import mongoose, { connection } from "mongoose";

const conn = {
    isConnected: false as boolean
}

export async function connectToDatabase() {
    if (conn.isConnected) return;
    try {
        const db = await mongoose.connect("mongodb://localhost:27017/hedytrello");
        console.log("Connected to database", db.connection.db.databaseName);
        conn.isConnected = db.connections[0].readyState === 1
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}
connection.on('connected', () => {
    console.log("Mongoose is connected")
})
connection.on('error', () => {
    console.log("Mongoose connection error")
})

