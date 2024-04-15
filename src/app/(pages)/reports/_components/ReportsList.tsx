'use client';

import ReportCard from './ReportCard';
import Totals from './Totals';
import {useEffect, useState} from 'react';
import {T_Report} from '@/app/_lib/types/T_Report';
import data from '../../../_lib/reports.json';

export default function ReportsList() {
    // const [reports, setReports] = useState<any>();
    const [reports, setReports] = useState<any>(data);
    const [reportsElements, setReportsElements] = useState<any>([]);
    const [reportsTotals, setReportsTotals] = useState<any>([0, 0, 0]);

    // const getReports = () => {
    //     fetch('http://0.0.0.0:3000/api/reports')
    //         .then(res => res.json())
    //         .then(reports => {
    //             setReports(reports);
    //         });
    // };

    // useEffect(() => getReports(), []);

    useEffect(() => {
        const reportsList = reports
            .map((report: T_Report) => <ReportCard key={`${report._id}`} report={report} />)
            .slice(0, -1) // Remove the last element from the array => The last element is the template
            .reverse(); // Order from the latest to the oldest

        const totalMeetings = reports.length;
        const totalMeetingsTime = reports.reduce((acc: number, report: any) => acc + report.duration, 0);
        const totalBlockers = reports.reduce((acc: number, report: any) => {
            if (report.blockers) return acc + 1;
            return acc;
        }, 0);

        setReportsTotals([totalMeetings, totalMeetingsTime, totalBlockers]);
        setReportsElements(reportsList);
        console.log(reports);
    }, []);

    return (
        <>
            {!reports && <p>Loading...</p>}
            {reports && (
                <>
                    <Totals totals={reportsTotals} />
                    {reportsElements}
                </>
            )}
        </>
    );
}
