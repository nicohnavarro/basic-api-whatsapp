import * as cheerio from 'cheerio';
import got from 'got-cjs';
const url = 'https://web.whatsapp.com/';

const response = (async () => {
  const response = await got(url);
  const $ = cheerio.load(response.body);
  console.log($('div'));
  return $.html();
})();
