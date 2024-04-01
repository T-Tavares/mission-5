import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
const cached: {connection?: typeof mongoose; promise?: Promise<typeof mongoose>} = {};

// export default async function connectToDatabase() {
//     if (!URI) throw new Error('MongoDB URI is not defined on your .env file');
//     if (cached.connection) return cached.connection;
//     if (!cached.promise) {
//         const opts = {bufferCommands: false};
//         const promise = mongoose.connect(URI, opts);
//         cached.promise = promise;
//     }
//     try {
//         cached.connection = await cached.promise;
//     } catch (error) {
//         cached.promise = undefined;
//         throw new Error('Could not connect to MongoDB : ' + error);
//     }
//     return cached.connection;
// }

export default async function connectToDatabase() {
    if (!URI) throw new Error('MongoDB URI is not defined on your .env file');
    const clientPromise = mongoose.connect(URI, {bufferCommands: false});
    return clientPromise;
}
