import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from 'crypto';
import { readFileSync } from 'fs';

interface DecryptInterface {
  decrypted: string;
  error: string | null;
}

interface EncryptInterface {
  encrypted: string | any;
  error: string | null;
}

const pass = readFileSync('src/config/secret.key').toString();

const key = createHash('sha256')
  .update(String(pass))
  .digest('base64')
  .substr(0, 32);

async function Encrypt(text: string): Promise<EncryptInterface> {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const result = Buffer.concat([iv, cipher.update(text), cipher.final()]);
  let res = Buffer.from(result).toString('base64');
  return {
    encrypted: res,
    error: null,
  };
}

async function Decrypt(data: string | any): Promise<DecryptInterface> {
  data = Buffer.from(data, 'base64');
  const iv = data.slice(0, 16);
  data = data.slice(16);

  const dechiper = createDecipheriv('aes-256-ctr', key, iv);
  const result = Buffer.concat([dechiper.update(data), dechiper.final()]);
  return {
    decrypted: result.toString(),
    error: null,
  };
}

export { Encrypt, Decrypt };
