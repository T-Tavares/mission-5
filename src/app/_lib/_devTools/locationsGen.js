import fs from 'fs';
// Gas Stations locations Generator
// Chat GPT refused to generate my Data, so I had to generate it manually.

// HELPERS

const getRandom = array => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const names = ['Z Energy Station', 'Z Energy', 'Z Energy Services', 'Service Station', 'Gas Station'];

const address = [
    '1 Main Street',
    '2 Main Street',
    '3 Main Street',
    '4 Main Street',
    '5 Main Street',
    '23 Street Avenue',
    '12 Street Avenue',
    '45 Street Avenue',
    '67 Street Avenue',
    '89 Street Avenue',
    '12 This place is amazing',
    '14 This place is amazing',
    '13 This place is amazing',
    '15 This place is amazing',
    '16 This place is amazing',
    '23 Wonderland',
    '24 Wonderland',
    '25 Wonderland',
    '26 Wonderland',
    '27 Wonderland',
    '34 The best place',
    '35 The best place',
    '36 The best place',
    '37 The best place',
    '38 The best place',
    '45 The best place',
    '46 The best place',
];

const prices = [5.99, 4.8, 7, 6.5, 5.5, 4.3, 6.2, 7.5, 5.5, 4.5];
const froms = [6, 7, 8, 9, 10];
const tos = [18, 19, 20, 21, 22];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const geoLat = () => getRandomNumber(-46.7, -34.5);
const geoLon = () => getRandomNumber(171, 178);

const types = ['Truck Stop', 'Service Station'];
const bool = [true, false];

// GENERATE SINGLE LOCATION

const generateLocation = () => {
    return {
        name: getRandom(names),
        address: getRandom(address),
        price: getRandom(prices),
        openingHours: {
            from: getRandom(froms),
            to: getRandom(tos),
        },
        geocode: {
            lat: geoLat(),
            lon: geoLon(),
        },
        type: getRandom(types),
        services: {
            trailerHire: getRandom(bool),
            carWash: getRandom(bool),
            tirePressure: getRandom(bool),
            foodnDrink: getRandom(bool),
            toilet: getRandom(bool),
            ATM: getRandom(bool),
            EVcharging: getRandom(bool),
            LPGbottleSwap: getRandom(bool),
        },
    };
};

// GENERATE A BUNCH OF LOCATIONS
const locations = [];
for (let i = 0; i < 100; i++) locations.push(generateLocation());
const locationsJSON = JSON.stringify(locations, null, 2);

fs.writeFile('locations.json', locationsJSON, 'utf8', err => {
    if (err) return console.log(err);
    return console.log('Locations Generated!');
});