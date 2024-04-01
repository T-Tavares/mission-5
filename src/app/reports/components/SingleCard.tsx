import {T_Report} from '../../../../lib/types/types';

export default function SingleCard({data}: {data: T_Report}) {
    const currKey = data._id.toString();

    return (
        <div key={currKey} className="flex-col rounded-lg border-4 border-primary m-5">
            <header className="flex justify-between px-4 py-2 bg-primary text-white">
                <p>
                    {new Date(data.date).toLocaleDateString('en-UK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
                <p>{data.teams.join(' - ')}</p>
                <p>{data.duration} min</p>
            </header>

            <div className="py-2 px-4">
                {/*/ ------------------------ REPORT SUMMARY ------------------------ /*/}

                <p>Summary:</p>
                <p className="pb-3 text-zinc-500">{data.summary}</p>

                {/*/ ------------------- REPORT SUMMARY LIST LOOP ------------------- /*/}

                <p>Points:</p>
                {data.points && (
                    <ul className="list-disc pl-10">
                        {data.points.map((point: string, index: number) => (
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
