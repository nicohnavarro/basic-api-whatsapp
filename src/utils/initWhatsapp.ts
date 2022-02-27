import { Client } from 'whatsapp-web.js';
import * as fs from 'fs';

const SESSION_FILE_PATH = '../../session.json';
let sessionCfg;
let tempQr: string;
if (fs.existsSync(SESSION_FILE_PATH)) {
  fs.readFile(SESSION_FILE_PATH, function (err, data) {
    // Check for errors
    if (err) throw err;

    // Converting to JSON
    sessionCfg = JSON.parse(data.toString());
  });
}

const client = new Client({
  puppeteer: { headless: true },
  session: sessionCfg,
});
client.initialize();

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  tempQr = qr;
});

client.on('authenticated', (session) => {
  console.log('AUTHENTICATED', session);
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

client.on('auth_failure', (msg) => {
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
  console.log('READY');
});

const getQr = () => {
  return tempQr;
};

export { client, getQr };
