import Image from 'next/image';
import Link from 'next/link';
import reportsDB from '../../init/agile-meetings.json';

export default function Home() {
    return (
        <main>
            <h1>Hello MF</h1>
            <Link href="/reports">Reports</Link>
        </main>
    );
}
