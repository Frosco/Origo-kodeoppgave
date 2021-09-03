import got from 'got';

const express = require('express')
const app = express()
const port = 3000

const stationUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
const statusUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
const httpOptions = {
  headers: {
    'Client-Identifier': 'grashorn-kodeoppgave'
  }
};

app.get('/stations', async (req, res) => {
  const {data} = await got.get(stationUrl, httpOptions).json();
  res.send(data);
})

app.get('/status', async (req, res) => {
  const {data} = await got.get(statusUrl, httpOptions).json();
  res.send(data);
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})