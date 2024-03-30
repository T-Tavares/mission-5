import {NextResponse} from 'next/server';
import reportsController from '../../../../lib/controllers/reportsController';

export async function GET() {
    const reports = await reportsController();
    return NextResponse.json(reports);
}
