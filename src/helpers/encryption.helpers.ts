import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from 'crypto';
import { readFileSync } from 'fs';

const pass = readFileSync('src/config/secret.key').toString();

const key = createHash('sha256')
  .update(String(pass))
  .digest('base64')
  .substr(0, 32);

async function Encrypt(text) {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const result = Buffer.concat([iv, cipher.update(text), cipher.final()]);
  return result;
}

async function Decrypt(data) {
  data = Array.isArray(JSON.parse(data))
    ? Buffer.from(JSON.parse(data), 'binary')
    : Buffer.from(data, 'binary');
  const iv = data.slice(0, 16);
  data = data.slice(16);

  const dechiper = createDecipheriv('aes-256-ctr', key, iv);
  const result = Buffer.concat([dechiper.update(data), dechiper.final()]);
  return result;
}

export { Encrypt, Decrypt };
