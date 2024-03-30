import {T_Report} from '../../../../lib/types/types';

export default async function ReportsCards() {
    const reports = await fetch(`http://localhost:${process.env.PORT}/api/reports`).then(res => res.json());

    const reportsCards: JSX.Element[] | undefined = reports
        ?.map((report: T_Report) => {
            const currKey: string = report._id.toString(); // _id is an ObjectId, and Objs can't be JSX keys
            return (
                // ---------------------- REPORT CARDS LOOP ----------------------- //

                <div key={currKey} className="flex-col rounded-lg border-4 border-primary m-5">
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
                                {report.points.map((point: string, index: number) => (
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
    return reportsCards;
}
