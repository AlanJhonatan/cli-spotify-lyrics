import http from 'node:http';
import url from 'node:url';
import { generatePKCE } from '../../services/spotify/pcke-config.js';

process.loadEnvFile('.env');

const PORT = Number(process.env['PORT']) || 8888;

const server = http.createServer((req, res) => {
    const { codeVerifier } = generatePKCE();

    if (!req.url) {
        console.error('❌ Invalid Request !');
        res.end();
        return;
    }

    console.log('method', req.method);

    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/callback') {
        const code = reqUrl.query['code'] || null;
        const error = reqUrl.query['error'] || null;

        if (error) {
            console.error('❌ Authorization Error:', error);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Authorization Error !</h1><p>You can close this window.</p>');
        } else if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Authorization Success !</h1><pYou may now close this window and back to the terminal.</p>');

            console.log('✅ Verifier Code received successfully !');
            console.log('Received code:', code);
            console.log('Code Verifier:', codeVerifier);
        } else {
            console.error('❌ Authorization Code not found.');
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Invalid Request !</h1><p>You can close this window.</p>');
        }

        server.close();
    }
});

export const createServer = (callback: () => void) => {
    server.on('error', (err) => {
        console.error('❌ [HTTP] Server Error', err);
        process.exit(1);
    });

    server.listen(PORT, '127.0.0.1', () => {
        callback();
    });
}
