export const dynamic = 'force-dynamic';

import {NextResponse} from 'next/server';
import connectToDatabase from '@/app/_lib/client';

export async function GET() {
    const client = await connectToDatabase();
    let reports;
    try {
        const db = client.db('zenergy-db');
        const collection = db.collection('reports');
        reports = await collection.find().toArray();
        await client.close();
    } catch (err) {
        throw new Error('Error while fetching reports: ');
    }

    return NextResponse.json({reports: reports ? reports : {error: 'No reports found!'}});
}
