const http = require('http');
const fs = require('fs');
const url = require('url');
const { Transform } = require('stream');

const PORT = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/upper') {
    const fileName = parsedUrl.query.fileName;

    if (!fileName || !fs.existsSync(fileName)) {
      res.statusCode = 400;
      return res.end();
    }

    res.statusCode = 200;

    const readStream = fs.createReadStream(fileName);

    const upperCaseTransform = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
      }
    });

    readStream.pipe(upperCaseTransform).pipe(res);

  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT);
