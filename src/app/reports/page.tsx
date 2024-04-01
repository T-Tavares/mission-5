'use client';

import ReportsCards from './components/ReportsCards';
import {T_Report} from '../../../lib/types/types';

export default async function ReportsPage() {
    const getReports = async () => {
        const rawData = await fetch(`http://localhost:3000/api/reports`);
        const reportsData = await rawData.json();
        console.log('Reports page hitpoint reports' + reportsData);
        return reportsData;
    };

    const reports = await getReports();

    return (
        <div>
            <h1 className="text-4xl text-center pt-5 text-primary">Reports: Agile Meetings</h1>
            <ReportsCards reports={reports} />
        </div>
    );
}
