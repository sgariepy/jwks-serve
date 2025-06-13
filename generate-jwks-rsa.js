import fs from 'node:fs/promises'
import { calculateJwkThumbprint, generateKeyPair, exportJWK, importX509 } from 'jose';


async function loadPrivateKey() {

  const algorithm = 'RS256'
  const keyFile = './keys/jwtRS256.key';
  const privateKeyPem = await fs.readFile(keyFile, 'utf-8')

  const ecPublicKey = await importX509(privateKeyPem, algorithm)
  console.log(ecPublicKey);

  const jwk = await exportJWK(ecPublicKey);
  console.log(jwk);
}

async function generateJwks() {
  const keyFile = './keys/jwks-private-public.json';

  const fileExists = await fs
    .stat(keyFile)
    .then(() => true)
    .catch(() => false);

  if (!fileExists) {
    const { privateKey } = await generateKeyPair('RS256');
    const jwk = await exportJWK(privateKey);
    const thumbprint = await calculateJwkThumbprint(jwk);

    const jwkWithKid = {
      ...jwk,
      kid: thumbprint,
    };

    await fs.writeFile(keyFile, JSON.stringify({ keys: [jwkWithKid]}));
  }

  const { keys } = JSON.parse(await fs.readFile(keyFile, 'utf-8'));
  const { kty, kid, n, e } = keys[0];
  const publicKey = { kty, kid, n, e };

  const publicKeyJwks = './keys/jwks.json';
  await fs.writeFile(publicKeyJwks, JSON.stringify({ keys: [publicKey]}));
}

//generateJwks();

loadPrivateKey();
