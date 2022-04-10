import * as express from 'express';
import { JWK, JWT, KeyParameters } from 'jose';
import { readFileSync } from 'fs';

const app = express();

const PORT = 8989;

interface JwtToken {
  header: {
    kid: string;
  };
}

app.use(express.json());

app.post('/auth/generate', async (request, response) => {
  const env = request.body.env;

  const privateKey = readFileSync(`./keys/mkjwk.pem`);

  const params: KeyParameters = null;

  const key = JWK.asKey(privateKey);

  const payload = {
    iss: 'acme-provider',
    sub: request.body.expectedExternalId,
    aud: 'cl-124',
    token_use: 'id',
    email: 'sgariepy@bhvr.com',
    email_verified: true,
    given_name: 'Stéphane Gariépy'
  };

  const token = JWT.sign(payload, key, {
    algorithm: 'RS256',
    expiresIn: '2 hours',
    header: {
      typ: 'JWT',
      kid: 'H2R87pzwRc9ZVJjMOFuim2n+KhY='
    }
  });

  response.json({ token }).send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
