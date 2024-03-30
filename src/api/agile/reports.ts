import getClient from '../../../lib/client';

async function getReport() {
    const client = await getClient();
    try {
        const reports = await client?.db('zenergy-db').collection('reports').find({}).toArray();
        console.log(reports);
        await client?.close();
    } catch (error) {
        console.error(error);
    }
}

export default getReport;

// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //

// async function mongoConnect() {
//     const auth = {
//         // user: process.env.MONGO_INITDB_ROOT_USERNAME,
//         // pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
//         // db: process.env.MONGO_INITDB_DB,
//         user: process.env.MONGO_USER,
//         pass: process.env.MONGO_PASS,
//         db: process.env.MONGO_INITDB_DB,
//     };

//     // const uri = `mongodb://${auth.user}:${auth.pass}@localhost:27017/${auth.db}?authSource=${auth.db}`;
//     const uri = `mongodb://user:demacia@localhost:27017/zenergy-db?authSource=zenergy-db`;
//     const client = new MongoClient(uri);

//     console.log('Connected to MongoDB');
//     return client.connect();
// }

// async function main() {
//     try {
//         const uri = `mongodb://user:demacia@localhost:27017/zenergy-db?authSource=zenergy-db`;
//         const client = new MongoClient(uri);

//         await client.connect();

//         // const client = await mongoConnect();
//         const db = client.db('zenergy-db');
//         const reports = db.collection('reports').find({}).toArray();
//         // console.log('Connected to MongoDB');
//         console.log(reports);
//         await client.close();
//     } catch (err) {
//         console.error(err);
//     }
// }

// import dbConnect from '../../../lib/dbConnect';
// import reportsModel from '../../../lib/models/reportsModel';
// import {NextApiRequest, NextApiResponse} from 'next';

// export async function reportsAPI(_: NextApiRequest, res: NextApiResponse) {
//     await dbConnect();
//     const data = await reportsModel.find({});

//     if (!data) return res.send({error: 'No reports found'});
//     return res.send(data);
// }
