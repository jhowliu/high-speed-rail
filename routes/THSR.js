const express = require('express');
const requireDir = require('require-dir');

const Parser = require('../lib/parser');
const Train = require('../lib/train');
const manifest = requireDir('../manifest');

const router = express.Router();

router.post('/', (req, res) => {
  let startStation = req.body.startStation || req.query.startStation;
  let endStation = req.body.endStation || req.query.endStation;
  let datetime = req.body.datetime || req.query.datetime;
  // replace station name with station id
  startStation = manifest.stations[startStation];
  endStation = manifest.stations[endStation];
  datetime = Parser.parse(datetime);

  Train.requestSchedule({
    datetime: datetime,
    startStation: startStation,
    endStation: endStation
  }).then( (resp) => {
    res.send({ success: true, msg: 'Fetch successfully.', data: resp.data });
  }).catch( (err) => {
    res.send({ success: false, msg: 'Failed to request rail schedule.', err: err.toString() });
  })
});

module.exports = router;
