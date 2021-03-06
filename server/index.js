const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');
const dbHelper = require('../database/dbHelpers.js');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/:id/', express.static(path.join(__dirname, '/../client/dist')));

app.get('/businesses/:businessId/images', (req, res) => {
  dbHelper.getImages({ id: req.params.businessId }, (err, images) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(images);
    }
  });

});

app.post('/businesses/:businessId/images', (req, res) => {
  dbHelper.postImage({ id: req.params.businessId }, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send();
    }
  });

});

app.put('/businesses/:businessId/images/:imageId', (req, res) => {
  const { businessId, imageId } = req.params;
  if (err) {
    res.status(400).send(err);
  } else {
    res.status(200).send();
  }
});

app.delete('/businesses/:businessId/images', (req, res) => {
  const { businessId } = req.params;
  if (err) {
    res.status(400).send(err);
  } else {
    res.status(200).send();
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
