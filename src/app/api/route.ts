import {NextResponse} from 'next/server';

export async function GET() {
    // return NextResponse.redirect('/reports', {status: 301});
    return NextResponse.json({message: 'Hello, World!'});
}
