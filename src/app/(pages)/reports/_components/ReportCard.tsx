import {T_Report} from '@/app/_lib/modules/T_Report';

export default function ReportCard({report}: {report: T_Report}) {
    const currKey = report._id.toString();
    return (
        <div key={currKey} className="flex-col rounded-lg border-4 border-primary m-5">
            <header className="flex justify-between px-4 py-2 bg-primary text-white">
                <p>
                    {new Date(`${report.date}`).toLocaleDateString('en-UK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
                <p>{report.teams.join(' - ')}</p>
                <p>{`${report.duration}`} min</p>
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
}
