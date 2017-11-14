const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3456);

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(app.get('port'), () => {
  console.log('The application is listen on port '+app.get('port'));
});
