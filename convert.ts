import { readFileSync } from 'fs';
import { pem2jwk } from 'pem-jwk';
import { jwk2pem } from 'pem-jwk';
 
const str = readFileSync('./keys/key1.pem', 'ascii')
const jwk = pem2jwk(str)
// const pem = jwk2pem(jwk)


console.log(jwk);

// pem-jwk private.jwk > private.pem
