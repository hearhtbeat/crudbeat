const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const uri = 'your_mongodb_uri';

app.use(express.json());

let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('testdb');
    console.log('Connected to Database');
  })
  .catch(error => console.error(error));

app.get('/items', async (req, res) => {
  const items = await db.collection('items').find().toArray();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = req.body;
  await db.collection('items').insertOne(item);
  res.status(201).json(item);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
