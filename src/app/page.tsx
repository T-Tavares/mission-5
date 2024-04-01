import Link from 'next/link';
import reportsDB from './_lib/agile-meetings.json';
import Hero from './_components/hero';


export default function Home() {
    return (
        <main className=''>
            {/* <Link href="/reports">Reports</Link> */}
            <Hero />
        </main>
    );
}
