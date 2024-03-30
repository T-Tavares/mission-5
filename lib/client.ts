import {MongoClient} from 'mongodb';

async function getClient() {
    const auth = {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        db: process.env.MONGO_INITDB_DB,
    };

    try {
        const uri = `mongodb://${auth.user}:${auth.pass}@localhost:27017/${auth.db}?authSource=${auth.db}`;
        const client = new MongoClient(uri);

        // Returns a promise => the client, chain it to db methods for CRUD operations
        return client.connect();
        // usage ex:..
        // client.db('zenergy-db').collection('reports').find({}).toArray();
        //
    } catch (err) {
        console.error(err);
    }
}

export default getClient;
