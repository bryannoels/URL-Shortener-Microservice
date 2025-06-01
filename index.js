require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

let urlDatabase = []
let id = 1

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post('/api/shorturl', (req, res) => {
  let originalUrl = req.body.url;
  try {
    let urlObj = new URL(originalUrl);
    dns.lookup(urlObj.hostname, (err) => {
      if (err) {
        console.log('DNS lookup error:', err);
        return res.json({ "error": 'invalid url' });
      }
      let found = urlDatabase.find(url => url.original_url === originalUrl);
      if (found) {
        return res.json(found);
      } else {
        let newUrl = {
          original_url: originalUrl,
          short_url: id++
        };
        urlDatabase.push(newUrl);
        return res.json(newUrl);
      }
    });
  } catch (e) {
    console.log('URL parsing error:', e);
    return res.json({ "error": 'invalid url' });
  }
});

app.get('/api/shorturl/:short_url', (req, res) => {
  let shortUrl = req.params.short_url;
  let found = urlDatabase.find(url => url.short_url == shortUrl);
  if (found) {
    return res.redirect(found.original_url);
  } else {
    return res.json({ "error": 'invalid url' });
  }
});