import express = require('express');
import cors = require('cors');
import { StationStatus } from './types';
import { GetStationStatuses } from './stationService';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:3000'
}))

app.get('/', async (req, res, next) => {
  let stationStatuses: StationStatus[]

  try {
    stationStatuses = await GetStationStatuses();
  } catch (e) {
    next(e)
  }

  res.send(stationStatuses)
});

app.get('/healthz', function(req, res) {
  res.status(200).send("Alive!")
});

app.use(errorHandler);

const port = 3100;
app.listen(port, () => {
  console.log(`API listening at port ${port}`)
})

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
}
