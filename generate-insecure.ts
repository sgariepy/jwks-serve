import { JWK, JWT } from 'jose';
import base64url from "base64url";

const key = JWK.asKey('1234567');

const header = {
  alg: 'none',
  typ: 'JWT'
};

const payload = {
  userId: '964a37e1-83cc-4921-8536-90e700ca8cd6',
  'iat': 1611196796
}

console.log(base64url(JSON.stringify(header)));
console.log(base64url(JSON.stringify(payload)));
