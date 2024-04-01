import {T_Report} from '../../../../lib/types/types';
// import SingleCard from './SingleCard';

// {reports}: {reports: T_Report[]}
export default async function ReportsCards({reports}: {reports: T_Report[]}) {
    console.log('Component Log' + reports);

    return <div>Reports Cards</div>;
    // const reportsCards: JSX.Element[] | undefined = reports
    //     ?.map((report: T_Report) => <SingleCard data={report} />)
    //     .slice(0, -1) // Remove the last element from the array => The last element is the template
    //     .reverse(); // Order from the latest to the oldest
    // return reportsCards;
}
