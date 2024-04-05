export default function filterDatabase(locationsDB: any, filtersArr: any[]) {
    return new Promise((resolve, reject) => {
        let filteringDB = locationsDB;
        try {
            filtersArr.forEach((filter: any) => {
                filteringDB = filteringDB.filter((location: any) => location.services[filter] === false);
            });
            resolve(filteringDB);
        } catch (error) {
            reject(error);
        }
    });
}
