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

filterSchedule = (data, time) => {
  return new Promise( (resolve, reject) => {
    resolve(true);
  });
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
