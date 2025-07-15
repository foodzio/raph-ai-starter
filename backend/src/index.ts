import { createServer } from 'http';
import { parse } from 'url';

// This is a basic backend entry point
// In a full implementation, you would set up your server, API routes, etc.

const PORT = process.env.PORT || 3001;

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url!, true);
  const { pathname } = parsedUrl;

  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

export default server; 