const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (
    req.method === 'GET' &&
    parsedUrl.pathname === '/missing-file'
  ) {
    const fileName = parsedUrl.query.fileName;

    if (!fileName) {
      res.statusCode = 400;
      return res.end('Missing fileName');
    }

    const readStream = fs.createReadStream(fileName);

    readStream.on('error', () => {
      res.statusCode = 500;
      res.end('Internal Server Error');
    });

    readStream.pipe(res);

  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);
