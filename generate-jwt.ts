import { JWK, JWT } from 'jose';
import { readFileSync } from 'fs';

const privateKey = readFileSync('./jwtRS256.yek');

const key = JWK.asKey(privateKey);

const payload = {
  'urn:example:claim': 'foo',
  name: 'John Doe',
  nickname: 'jdoe',
  picture: 'https://via.placeholder.com/150',
  email: 'jdow@gmail.com',
  email_verified: false,
  sub: "f6521dc6-7d8c-45f0-903d-4cc979b2e1ea"
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
