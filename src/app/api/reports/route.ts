// ---------------------------------------------------------------- //
// --------------------- REPORTS API ENDPOINT --------------------- //
// ---------------------------------------------------------------- //

export const dynamic = 'force-dynamic';

import {NextResponse} from 'next/server';
import connectToDatabase from '@/app/_lib/client';

export async function GET() {
    const {collection, client} = await connectToDatabase('reports');
    let reports;
    try {
        reports = await collection.find().toArray();
        await client.close();
    } catch (err) {
        throw new Error('Error while fetching reports: ' + err);
    }

    return NextResponse.json(reports ? reports : {error: 'No reports found!'});
}
