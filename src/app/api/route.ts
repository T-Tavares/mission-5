// USE THIS ROUTE AS A TEMPLATE OF OUR PATTERN FOR API ROUTES

/* 
    This line is necessary otherwhite NextJS will try to prerender the API's on the server
    And while building Docker image (at prerender time) there's no Database available
*/
export const dynamic = 'force-dynamic';

// Imports
import connectToDatabase from '../_lib/client';
import {NextResponse} from 'next/server'; // + NextRequest if youre passing any request.

export async function GET() {
    /* 
        ConnectToDatabase function returns the collection and the client (you'll need it to close the connection mostly)
    */
    // const {collection, client} = await connectToDatabase();

    return NextResponse.json({message: `Hi there, I am Z Energy API`});
}
