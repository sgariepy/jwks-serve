# JWKS Serve

Development project to expose a JWKS endpoint.

## Using local packages

    $ npm install

To start HTTP service:

    $ npm run serve 

Redirection for HTTPS using ngrok.  Simple way to use a HTTPS endpoint, but not required:

    $ npm run redirect

To generate JWT:

    $ npm run jwt

## Using global installed packages

Serving JWK public keys:

    $ serve -l <port>

Redirection for HTTPS.  Simple way to use a HTTPS endpoint, but not required:

    $ ngrok http <port>

Generate valid JWT with private key:

    $ ts-node generate-jwt.ts
