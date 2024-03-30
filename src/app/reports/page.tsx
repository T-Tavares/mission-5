'use client';
import reportsDB from '@/../init/agile-meetings.json';
import {useState} from 'react';

const ReportCards = reportsDB
    .map(report => {
        return (
            // ---------------------- REPORT CARDS LOOP ----------------------- //

            <div key={report._id} className="flex-col rounded-lg border-4 border-primary m-5">
                <header className="flex justify-between px-4 py-2 bg-primary text-white">
                    <p>
                        {new Date(report.date).toLocaleDateString('en-UK', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                    <p>{report.teams.join(' - ')}</p>
                    <p>{report.duration} min</p>
                </header>

                <div className="py-2 px-4">
                    {/*/ ------------------------ REPORT SUMMARY ------------------------ /*/}

                    <p>Summary:</p>
                    <p className="pb-3 text-zinc-500">{report.summary}</p>

                    {/*/ ------------------- REPORT SUMMARY LIST LOOP ------------------- /*/}

                    <p>Points:</p>
                    {report.points && (
                        <ul className="list-disc pl-10">
                            {report.points.map((point, index) => (
                                <li key={`list-key-${index}`} className="text-zinc-500">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    })
    .slice(0, -1) // Remove the last element from the array => The last element is the template
    .reverse(); // Order from the latest to the oldest

// ---------------------------------------------------------------- //
// ------------------------ REPORTS PAGE  ------------------------- //
// ---------------------------------------------------------------- //

const ReportsPage = async () => {
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        const res = await fetch('http://localhost:3001/api/agile/reports');
        const data = await res.json();
        setReports(data);
    };

    fetchReports();

    return (
        <div>
            <h1 className="text-4xl text-center pt-5 text-primary">Reports: Agile Meetings</h1>
            {ReportCards}
        </div>
    );
};

export default ReportsPage;
