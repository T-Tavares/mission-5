import ReportsList from './_components/ReportsList';
import {Suspense} from 'react';

const ReportsPage = async () => {
    return (
        <div>
            <h1 className="text-4xl text-center pt-5 text-primary">Reports: Agile Meetings</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <ReportsList />
            </Suspense>
        </div>
    );
};

export default ReportsPage;
