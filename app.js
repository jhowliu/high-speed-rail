const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const cors = require('cors');

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
});
