// import reportsDB from '../../_lib/agile-meetings.json';
import ReportsList from './_components/ReportsList';

const ReportsPage = () => {
    return (
        <div>
            <h1 className="text-4xl text-center pt-5 text-primary">Reports: Agile Meetings</h1>
            <ReportsList />
        </div>
    );
};

export default ReportsPage;
