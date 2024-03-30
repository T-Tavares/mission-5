import getClient from '../client';

export default async function reportsController() {
    // Open connection
    const client = await getClient();
    try {
        // Grab what I need to grab
        const db = client?.db('zenergy-db').collection('reports');
        const reports = await db?.find({}).toArray();

        // Close connection
        await client?.close();

        // Return the data
        return reports;
    } catch (error) {
        console.error(error);
    }
}
