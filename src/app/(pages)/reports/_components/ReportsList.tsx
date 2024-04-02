'use client';
import ReportCard from './ReportCard';
import {useEffect, useState} from 'react';
import {T_Report} from '@/app/_lib/types/T_Report';
// import {getServerSideProps} from 'next/dist/build/templates/pages';

export default async function ReportsList() {
    const [reports, setReports] = useState<any>();

    // const getReports = () => {
    //     fetch('http://0.0.0.0:3000/api/reports')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data.reports);
    //             setReports(data.reports);
    //         });
    // };

    // useEffect(() => getReports(), []);

    return (
        <>
            {
                reports &&
                    reports
                        .map((report: T_Report) => <ReportCard report={report} />)
                        .slice(0, -1) // Remove the last element from the array => The last element is the template
                        .reverse() // Order from the latest to the oldest
            }
        </>
    );
}
