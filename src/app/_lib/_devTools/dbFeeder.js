import PromptSync from 'prompt-sync';
import {MongoClient} from 'mongodb';

const prompt = PromptSync();
const zenergyDB = 'zenergy-db';

const USER = prompt(`Insert the user name for the database: `);
const PASS = prompt(`Insert the password for the database: `);
const URI = `mongodb+srv://${USER}:${PASS}@m5-zenergy-cluster.sjuceei.mongodb.net/?retryWrites=true&w=majority&appName=m5-zenergy-cluster`;

const getClient = async () => {
    if (!URI) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    return new MongoClient(URI);
};

const insertData = async (data, collectionName = 'reports', type = 'many') => {
    const client = await getClient();
    await client.connect();
    const collection = client.db(zenergyDB).collection(collectionName);

    if (type === 'single') await collection.insertOne(data).then(log => console.log(log));
    if (type === 'many') await collection.insertMany(data).then(log => console.log(log));

    await client.close();
};

// DATA DO BE ADDED WHEN THIS FILE RUNS
const model = [
    {
        _id: 12,
        date: '2024-04-02',
        duration: 40,
        window: '3:30pm to 4:10pm',
        teams: ['DEVS'],
        summary: `Devs catch up - We regularly explain our process and discoveries to each other so we are both fully fit to work on any part of the project.`,
        points: [
            'Due to NextJS being a server side rendering framework + The way we setup (API and Frontend together). We decided to host the DB on its own server. MongoDB.svr',
            'We are using Google Maps API to render the map and its data.',
        ],
        actions: [
            `We'll tackle the locations part of the database and combine everything.`,
            'Setup Google Maps API (Vlad alredy did it)',
            'Backend Routes and Filters needed for the map',
        ],
        blockers: {
            blocker: [],
            issues: [],
            solutions: [],
        },
    },
    {
        _id: 13,
        date: '2024-04-02',
        duration: 15,
        window: '5pm to 5:15pm',
        teams: ['DEVS', 'UXS'],
        summary: `AGILE Standup - Good Catch up, UX's finished their bunch. Show time for Devs.`,
        points: [
            'Locations Database Architecture',
            'Frontend Map page',
            'Setup Google Maps API',
            'Backend Routes and Filters needed for the map',
        ],
        actions: [
            'Undertand how the data flows from and to Google Maps API',
            "Probably deoploying the website separated from the CI/CD just so the UX's can access it on their presentations.",
        ],
        blockers: {
            blocker: [],
            issues: [],
            solutions: [],
        },
    },
];

insertData(model);
