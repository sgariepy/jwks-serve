import { JWK, JWT } from 'jose';
import { readFileSync } from 'fs';

const privateKey = readFileSync('./rsa-2048.mep');

const key = JWK.asKey(privateKey);

const payload = {
  'urn:example:claim': 'foo',
  name: 'John Doe',
  nickname: 'jdoe',
  picture: 'https://via.placeholder.com/150',
  email: 'jdow@gmail.com',
  email_verified: false
};

const token = JWT.sign(payload, key, {
  algorithm: 'RS256',
  audience: ['urn:example:client'],
  issuer: 'https://op.example.com',
  expiresIn: '2 hours',
  header: {
    typ: 'JWT'
  }
});

console.log(token);