// import mongoose from 'mongoose';

// const { MONGODB_URI } = process.env;

// if (!MONGODB_URI) {
//   throw new Error('MONGODB_URI no está definido');
// }

// export const connectDB = async () => {
//   try {
//     const { connection } = await mongoose.connect(MONGODB_URI);

//     if (connection.readyState === 1) {
//       console.log('MongoDB connected');
//       return Promise.resolve(true);
//     }

//   } catch (error) {
//     console.log('MongoDB not connected');

//     return Promise.reject(error);
//   }

// };
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definido');
}

const conn = {
  isConnected: false as boolean,
};

export const connectDB = async () => {
  if (conn.isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI);

    if (connection.readyState === 1) {
      console.log(`Connected to database: ${connection.db.databaseName}`);
      conn.isConnected = true;
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log('MongoDB not connected', error);
    return Promise.reject(error);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});
