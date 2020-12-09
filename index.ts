import * as express from 'express';
import { JWK, JWT } from 'jose';
import { readFileSync } from 'fs';

const app = express();

const PORT = 8989;

app.use(express.json());

app.post('/auth/external/generate', async (request, response) => {

  const env = request.body.env;

  const privateKey = readFileSync(`./keys/jwtRS256.${env}.key`);
  const key = JWK.asKey(privateKey);

  const payload = {
    sub: request.body.expectedExternalId
  };

  const token = JWT.sign(payload, key, {
    algorithm: 'RS256',
    expiresIn: '2 hours',
    header: {
      typ: 'JWT'
    }
  });

  response.json({ token }).send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

