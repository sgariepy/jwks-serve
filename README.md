# JWKS Serve

Serving JWK public keys:

    $ serve -l <port>

Simple way to use a HTTPS endpoint, but not required:

    $ ngrok http <port>

Generate valid JWT with private key:

    $ ts-node generate-jwt.ts
