export default function Totals({totals}: {totals: number[]}) {
    // On this order => Meetings - Meetings Time - Blockers
    const [meetings, meetingsTime, blockers] = totals;
    const meetingsHours = Math.floor(meetingsTime / 60);
    const meetingsMinutes = Math.round((meetingsTime / 60 - meetingsHours) * 60);
    return (
        <div className="flex-col rounded-lg border-4 border-primary m-5">
            <header className="py-2 bg-primary text-white">
                <h1 className="text-center text-xl">OUTSTANDING REPORT</h1>
            </header>
            <div className="flex justify-between p-5 px-24 ">
                <div className="flex flex-col items-center text-primary">
                    <p className="text-8xl font-extrabold">{meetings}</p>
                    <p className="text-2xl">Meetings</p>
                </div>
                <div className="flex flex-col items-center text-primary">
                    <div className="flex items-end">
                        <p className="text-8xl font-extrabold">
                            {meetingsHours}
                            <span className="text-2xl font-extrabold">h</span>
                        </p>
                        <p className="text-6xl font-extrabold ml-3 mb-1 ">
                            {meetingsMinutes}
                            <span className="text-2xl font-extrabold">m</span>
                        </p>
                    </div>
                    <p className="text-3xl">Total Meetings Time</p>
                </div>
                <div className="flex flex-col items-center text-primary">
                    <p className="text-8xl font-extrabold">{blockers}</p>
                    <p className="text-2xl">Solved Blockers</p>
                </div>
            </div>
        </div>
    );
}
