// ---------------------------------------------------------------- //
// -------------------- LOCATIONS API ENDPOINT -------------------- //
// ---------------------------------------------------------------- //

export const dynamic = 'force-dynamic';

import connectToDatabase from '@/app/_lib/client';
import {NextResponse} from 'next/server';

export async function GET() {
    const {collection, client} = await connectToDatabase('locations');
    let locations;
    try {
        locations = await collection.find({}).toArray();
        await client.close();
    } catch (err) {
        throw new Error('Error while fetching locations: ' + err);
    }
    return NextResponse.json(locations ? locations : {error: `No locations found!`});
}
