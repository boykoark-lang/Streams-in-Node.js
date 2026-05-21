const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/file') {
    const fileName = parsedUrl.query.fileName;

    if (!fileName || !fs.existsSync(fileName)) {
      res.statusCode = 400;
      return res.end();
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    const readStream = fs.createReadStream(fileName);

    readStream.pipe(res);

  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);
