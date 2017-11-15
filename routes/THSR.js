const express = require('express');
const requireDir = require('require-dir');

const Parser = require('../lib/parser');
const Train = require('../lib/train');
const manifest = requireDir('../manifest');

const router = express.Router();

router.post('/', (req, res) => {
  let startStation = req.body.startStation || req.query.startStation;
  let endStation = req.body.endStation || req.query.endStation;
  let departureTime = req.body.departureTime || req.query.departureTime;
  // replace station name with station id
  startStation = manifest.stations[startStation];
  endStation = manifest.stations[endStation];
  departureTime = Parser.parse(departureTime);

  Train.requestSchedule({
    departureTime: departureTime,
    startStation: startStation,
    endStation: endStation
  }).then( (resp) => {
    const result = Train.filterSchedule(resp.data, departureTime.time);
    res.send({ success: true, msg: 'Fetch successfully.', data: result });
  }).catch( (err) => {
    res.send({ success: false, msg: 'Failed to request rail schedule.', err: err.toString() });
  })
});

module.exports = router;
