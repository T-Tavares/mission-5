import {MongoClient} from 'mongodb';

async function getClient() {
    const auth = {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        db: process.env.MONGO_INITDB_DB,
    };

    try {
        // const uri = `mongodb://${auth.user}:${auth.pass}@localhost:27017/${auth.db}?authSource=${auth.db}`;
        // const uri = `mongodb://${auth.user}:${auth.pass}@0.0.0.0:27017/${auth.db}?authSource=${auth.db}`;
        const uri = `mongodb://${auth.user}:${auth.pass}@mongo:27017/${auth.db}?authSource=${auth.db}`;
        const client = new MongoClient(uri);
        return client.connect(); // Returns a promise
    } catch (err) {
        console.error(err);
    }
}

export default getClient;
