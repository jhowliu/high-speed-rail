const express = require('express');

const Parser = require('../lib/dateParser');

const router = express.Router();

router.post('/', (req, res) => {
  const startStation = req.body.startStation || req.query.startStation;
  const endStation = req.body.endStation || req.query.endStation;
});

module.exports = router;
