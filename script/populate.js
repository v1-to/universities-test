const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function run() {
    retrieveUniversities().then((universitiesByCountry) => console.log([].concat(...universitiesByCountry)));
}

async function retrieveUniversities() {
    const countries = [
        "argentina",
        "brasil",
        "chile",
        "colombia",
        "paraguai",
        "peru",
        "suriname",
        "uruguay"
    ];

    return Promise.all(
        countries.map((country) => {
            const apiUrl = `http://universities.hipolabs.com/search?country=${country}`;
            return new Promise(async (resolve) => {
                const response = await fetch(apiUrl);
                const data = await response.json();
                resolve(data);
            });
        })
    );
}

async function saveUniversities() {
    const database = 'universities';
}

run();