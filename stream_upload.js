const http = require('http');
const fs = require('fs');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const writeStream = fs.createWriteStream('upload.txt');

    req.pipe(writeStream);

    req.on('end', () => {
      res.statusCode = 200;
      res.end();
    });

    req.on('error', () => {
      res.statusCode = 500;
      res.end();
    });

  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);
