import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// caching the connection to the database helps with not creating new connections to the database which 
//   will exhaust database resources, which is more efficient
// set to mongodb connnection, otherwise set cached to empty object
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    // check if there is a connection
    if(cached.conn) {
        return cached.conn;
    }

    if(!MONGODB_URI) {
        throw new Error("MongoDB URI is missing!");
    }

    // if there is an established connection already, set it to the promise, otherwise create a new connection
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'eventtracer',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;

    return cached.conn;
}
// 1:36:50