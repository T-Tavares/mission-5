import {MongoClient} from 'mongodb';

export default async function connectToDatabase() {
    const URI = process.env.MONGODB_URI; // Comment/Uncomment for MongoDB Local
    // const URI = process.env.MONGODB_SRV_URI; // Comment/Uncomment for MongoDB Atlas

    if (!URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');

    return new MongoClient(URI);
}
