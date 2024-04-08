import React, {createContext, useContext, useEffect, useState} from 'react';

//  TODO WORK ON TYPES

const DatabaseContext = createContext({
    rawDatabase: undefined as any,
    locationsDB: undefined as any,
    filteredLocationsDB: undefined as any,

    calculateLocationsDB: () => {},
    filterLocationsDB: () => {},
});

export const useDatabaseContext = () => useContext(DatabaseContext);

export const DatabaseProvider = ({children}: {children: any}) => {
    const [rawDatabase, setRawDatabase] = useState<any>();
    const [locationsDB, setLocationsDB] = useState<any>();
    const [filteredLocationsDB, setFilteredLocationsDB] = useState<any>();

    const fetchRawDatabase = async () => {};
    const calculateLocationsDB = (rawDatabase: any) => {};
    const filterLocationsDB = (locationsDB: any) => {};

    return (
        <DatabaseContext.Provider
            value={{
                fetchRawDatabase,
                rawDatabase,
                calculateLocationsDB,
                locationsDB,
                filterLocationsDB,
                filteredLocationsDB,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
};
