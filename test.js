const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios').default

app.use(express.json());
app.use(cors());

let count = 0;
let countError = 0;

async function test() {
    for (let i = 0; i < 8000; i++) {
        axios({
            method: 'POST',
            url: url,
            timeout: 60000
        }).then(()=> {
            count++;
            console.log('Cantidad bien: ', count)
        }).catch(error => {
            countError++;
            console.log('Cantidad de errores: ', countError)
        });
    }
    console.log('Cantidad bien: ', count)
    console.log('Cantidad de errores: ', countError)
}

test();

