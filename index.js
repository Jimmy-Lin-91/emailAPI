const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');
const port = process.env.port || 3030;
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.get('/', (req, res, next) => {
  res.send('Api is running!');
});
app.post('/email', (req, res, next) => {
  sendGrid.setApiKey(process.env.key);
  const msg = {
    to: 'jimmy.lin0402@gmail.com',
    from: 'jimmy.lin0402@gmail.com',
    subject: req.body.subject,
    text: `${req.body.name} says ${req.body.message}  You can contact them at ${req.body.email}`
  }
  sendGrid.send(msg)
  .then((result) => {
    res.status(200).json({
      success: true
    })
  })
  .catch((err) => {
    console.log(err.response.body);
    })
});

app.listen(`${port}`, () => {
  console.log(`Listening from ${port}`);
});