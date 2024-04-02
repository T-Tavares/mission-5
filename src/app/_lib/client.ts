import {MongoClient} from 'mongodb';

export default async function connectToDatabase() {
    /* 
        The lines below hold three URI's to connect you to MongoDB.
        Comment / Uncomment the one you want to use.
        The first two are for local development, the third is for production
        On local enviroment, prefere the ADMIN URI for security reasons
    */

    const URI = process.env.MONGODB_URI_ROOT;
    // const URI = process.env.MONGODB_URI_ADMIN;
    // const URI = process.env.MONGODB_SRV_URI;

    if (!URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');

    return new MongoClient(URI);
}
