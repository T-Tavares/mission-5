export type T_Location = {
    name: string;
    address: string;
    price: number;
    openingHours: {
        from: number;
        to: number;
    };
    geocode: {
        lat: number;
        lon: number;
    };
    type: 'Truck Stop' | 'Service Station';
    services: {
        trailerHire: boolean;
        carWash: boolean;
        tirePressure: boolean;
        foodnDrink: boolean;
        toilet: boolean;
        ATM: boolean;
        EVcharging: boolean;
        LPGbottleSwap: boolean;
    };
};
