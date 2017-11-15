const url = require('url');
const axios = require('axios');
const jsSHA = require("jssha");
const requireDir = require('require-dir');

const manifest = requireDir('../manifest');

requestSchedule = (req) => {
  const date = req.datetime.date;
  const start = req.startStation;
  const end = req.endStation;

  const uri = `/${start}/to/${end}/${date}`;
  const _axios = _buildAxios()

  let payload = _buildTrainObj();

  return _axios.get(uri, { params: payload });
}

filterSchedule = (trains, time) => {
  filteredTrains = trains.filter(train => train.OriginStopTime.DepartureTime > time);
  filteredTrains = filteredTrains.map( (train) => {
    return {
      StartStation: train.OriginStopTime.StationName.Zh_tw,
      DepartureTime: train.OriginStopTime.DepartureTime,
      EndStation: train.DestinationStopTime.StationName.Zh_tw,
      ArivalTime: train.DestinationStopTime.ArrivalTime,
    }
  });
  sortedTrains = filteredTrains.sort( (a, b) => { return a.DepartureTime >= b.DepartureTime ? 1: -1 });

  return sortedTrains;
}

const Train = {
  requestSchedule,
  filterSchedule
}

_buildTrainObj = () => {
  return {
      $format: 'JSON'
  }
}

_buildAxios = () => {
  const instance = axios.create({
    baseURL: manifest.services.THSR.api,
    timeout: 10000,
    headers: _buildAuthorizationHeader()
  })
  return instance;
}

_buildAuthorizationHeader = () => {
  const GMTString = new Date().toGMTString();

  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(manifest.tokens.key, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = 'hmac username=\"' + manifest.tokens.app + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

  return {
    'Authorization': Authorization,
    'X-Date': GMTString,
  }
}

module.exports = Train;
