const newrelic = require("newrelic");
const express = require("express");
const parse = require("url").parse;

const { abc } = require("./modules/abc")

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/custom', (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname } = parsedUrl;

  newrelic.setTransactionName(pathname);

  res.send(pathname);
});

app.get('/error', (req, res) => {
  const test = abc('');

  res.send(test);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})