import Link from 'next/link';
// import getClient from '../../lib/client';
import getReport from '@/api/agile/reports';

export default function Home() {
    getReport();
    return (
        <main>
            <h1>Home Page</h1>
            <Link href="/reports">Reports</Link>
        </main>
    );
}
