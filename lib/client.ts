import {MongoClient} from 'mongodb';

export default async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI!);
    return client;
}
