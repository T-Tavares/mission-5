import ReportCard from './ReportCard';
import {T_Report} from '@/app/_lib/modules/T_Report';

export default async function ReportsList() {
    const res = await fetch('/api/reports');

    return <p>res</p>;
    // (
    //     .map((report: T_Report) => <ReportCard report={report} />)
    //     .slice(0, -1) // Remove the last element from the array => The last element is the template
    //     .reverse(); // Order from the latest to the oldest
    // )
}
