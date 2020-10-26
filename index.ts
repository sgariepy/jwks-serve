import * as express from 'express';
import { JWK, JWT } from 'jose';
import { readFileSync } from 'fs';

const app = express();

const PORT = 8989;

app.use(express.json());

app.post('/auth/external/generate', async (request, response) => {

  const privateKey = readFileSync('./jwtRS256.key');
  const key = JWK.asKey(privateKey);

  const payload = {
    'urn:example:claim': 'foo',
    name: 'John Doe',
    nickname: 'jdoe',
    picture: 'https://via.placeholder.com/150',
    email: 'jdow@gmail.com',
    email_verified: false,
    sub: request.body.expectedExternalId
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

  response.json({ token }).send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

