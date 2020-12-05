const axios = require('axios').default
const express = require('express');
const asyncify = require('express-asyncify')
const bodyParser = require('body-parser')
const cluster = require('express-cluster')
const compression = require('compression')
const cors = require('cors')

function start () {
    const app = asyncify(express());
    const http = require('http').createServer(app);
    app.use(compression());
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.set('port', 3010);

    app.use((err, req, res, next) => {
        if (err.message.match(/not found/)) {
            return res.status(404).send({ error: err.message });
        }
        res.status(500).send({error: err.message});
    });

    app.get('/test', (req, res) => {
        res.sendStatus(200);
    });

    return http.listen(app.get('port'), function () {
        console.log(`Your app is listening on port ${app.get('port')}`);
    });
}

cluster(function () {
    start()
  }
