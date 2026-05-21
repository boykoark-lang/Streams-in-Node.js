const http = require('http');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/count') {
    let bytes = 0;
    let chunks = 0;

    req.on('data', (chunk) => {
      bytes += chunk.length;
      chunks++;
    });

    req.on('end', () => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        bytes,
        chunks
      }));
    });

  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);
