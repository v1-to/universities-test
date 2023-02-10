const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db(process.env.MONGODB_DATABASE);

async function run() {
    try {
        const universities = await retrieveUniversities();
        await saveUniversities(universities);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
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
    const arraysOfUniversities = await Promise.all(
        countries.map((country) => {
            const apiUrl = `http://universities.hipolabs.com/search?country=${country}`;
            return new Promise(async (resolve) => {
                const response = await fetch(apiUrl);
                const data = await response.json();
                resolve(data);
            });
        })
    );

    return [].concat(...arraysOfUniversities);
}

async function saveUniversities(universities) {
    await client.connect()
    await setupDatabase();
    try {
        await db.collection('universities').insertMany(universities, { ordered: false });
    } catch(err) {}
}

async function setupDatabase() {
    await client.connect()
    if(!db.collection('universities'))
        await db.createCollection('universities');
    await db.collection('universities').createIndex({ name: 1, 'state-province': 1, country: 1 }, { unique: true });
}

run();