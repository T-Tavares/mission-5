export default function filterDatabase(locationsDB: any, filtersArr: any[]) {
    let filteringDB = locationsDB;

    if (filtersArr.includes('trailer hire')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.trailerHire);
    }
    if (filtersArr.includes('tyre pressure')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.tyrePressure);
    }
    if (filtersArr.includes('ev charging')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.EVcharging);
    }
    if (filtersArr.includes('lpg bottle swap')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.lPGbottleSwap);
    }
    if (filtersArr.includes('food and drink')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.foodAndDrink);
    }
    if (filtersArr.includes('toilets')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.toilets);
    }
    if (filtersArr.includes('car wash')) {
        filteringDB = filteringDB.filter((location: any) => !location.services.carWash);
    }
    if (filtersArr.includes('engine oils')) {
        filteringDB = filteringDB.filter((location: any) => !location.products.engineOils);
    }
    if (filtersArr.includes('atm')) {
        filteringDB = filteringDB.filter((location: any) => !location.products.ATM);
    }

    return filteringDB;
}
