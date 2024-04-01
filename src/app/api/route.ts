import {NextResponse} from 'next/server';
// import connectToDatabase from '../_lib/client';

export async function GET() {
    // const client = await connectToDatabase();
    // const reports = client.db('zenergy-db').collection('reports').find({}).toArray();

    return NextResponse.json({message: 'hellow world'});
    // return NextResponse.json({data: 'test', reports: (await reports) ? reports : 'No reports found!'});
}
