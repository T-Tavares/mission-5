import React from 'react';
import reportsDB from '../../_lib/agile-meetings.json';

// ? Though I would need a Type

// type T_report = {
//     _id: Number;
//     date: String;
//     duration: Number;
//     teams: Array<'uxs' | 'devs'>;
//     summary: String;
//     points?: Array<String>;
//     actions?: Array<String>;
//     blockers?: {
//         blocker?: Array<String>;
//         issues?: Array<String>;
//         solutions?: Array<String>;
//     };
// };

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

const ReportsPage = () => {
    return (
        <div>
            <h1 className="text-4xl text-center pt-5 text-primary">Reports: Agile Meetings</h1>
            {ReportCards}
        </div>
    );
};

export default ReportsPage;
