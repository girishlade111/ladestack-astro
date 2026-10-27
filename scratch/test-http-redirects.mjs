import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIST_DIR = path.resolve('dist');

// Simple static server simulating standard static web hosting without custom redirect rules
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': ext === '.html' ? 'text/html; charset=utf-8' : 'text/plain',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(content);
  } else {
    const notFoundPath = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(notFoundPath));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
});

server.listen(4321, async () => {
  console.log('Static test server listening on http://localhost:4321');

  const targets = [
    '/projects',
    '/file-sharing-platform',
    '/api-testing-platform',
    '/ai-code-viewer-ai',
    '/blog/1',
    '/blog/2',
    '/blog/3',
    '/blog/4',
    '/blog/5',
    '/blog/6',
    '/sitemap-pages.xml',
    '/sitemap-blog.xml',
    '/non-existent-route-for-testing'
  ];

  for (const target of targets) {
    await new Promise((resolve) => {
      http.get(`http://localhost:4321${target}`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          const hasMetaRefresh = body.includes('http-equiv="refresh"');
          const refreshDest = hasMetaRefresh ? body.match(/content="0;url=([^"]+)"/)?.[1] : null;
          console.log(`GET ${target} -> Status: ${res.statusCode}, Meta-Refresh: ${hasMetaRefresh ? refreshDest : 'none'}`);
          resolve();
        });
      });
    });
  }

  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
