const express = require('express');
const { connection } = require('./configs/db.js');
require('dotenv')

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Basic API Endpoint')
});

app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Cannot connect to DB')
    }
    console.log(`Server is running on port ${process.env.port}`)
})