const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');
const cors = require('cors');
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(cors())

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  const db = database.db('database');
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})