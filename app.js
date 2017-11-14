const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const cors = require('cors');

const Parser = require('./lib/dateParser');
const Train = require('./lib/train');

const app = express();

const manifest = requireDir('./manifest');


app.set('port', 3456);

// allow cross-origin-resource-sharing
app.use(cors());

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

const THSR = require('./routes/THSR');

app.use('/THSR', THSR);

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(app.get('port'), () => {
  console.log('The application is listen on port '+app.get('port'));
  let requestTime = '2017111114';
  const obj = Parser.parse(requestTime);
  console.log(Train.requestSchedule({'startStation': '1000', 'endStation': '1040', date: obj.date }))
});
