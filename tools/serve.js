// Tiny static file server for local preview (supports HTTP Range so videos can seek).
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = require('path').resolve(__dirname, '..', 'site');
const port = process.env.PORT || 5173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.stat(file, (err, st) => {
    // like GitHub Pages / most hosts: /about -> /about/ when a folder with an index.html exists
    if (!err && st.isDirectory() && fs.existsSync(path.join(file, 'index.html'))) { res.writeHead(301, { Location: req.url.split('?')[0] + '/' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '') }); return res.end(); }
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const [s, e] = range.replace('bytes=', '').split('-');
      const start = parseInt(s, 10) || 0;
      const end = Math.min(e ? parseInt(e, 10) : st.size - 1, st.size - 1);
      // a range that starts at or past the end of the file (browsers probe like this) must get 416, not a crash
      if (start >= st.size || start > end) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes' });
      fs.createReadStream(file).pipe(res);
    }
  });
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
