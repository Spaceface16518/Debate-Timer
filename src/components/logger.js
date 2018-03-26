import {appendFile} from 'fs';

export function log(message) {
  appendFile('./.appcache.log', `[${Date.now()}] ${message}\n`,
    (err) => {
      console.error(err);
    });
}

export function err(message) {
  appendFile('./.appcache.log', `[${Date.now()}] ERROR: ${message}\n`,
    (err) => {
      console.error(err);
    });
}
