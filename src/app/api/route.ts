import {NextResponse} from 'next/server';

export async function GET() {
    return NextResponse.json({message: `Hi there, I am Z Energy API`});
}
