# Setting Up HTTPS for Next.js Development

This guide will walk you through the steps to enable HTTPS for your Next.js application during development using `http-server` and self-signed SSL certificates.

## Prerequisites

1. Node.js and npm must be installed on your machine.
2. OpenSSL (or `mkcert`) for generating SSL certificates.

## Step 1: Install `http-server`

Open your terminal and run the following command to install `http-server` globally on your machine:

```bash
npm install -g http-server
```

## Step 2: Generate SSL Certificates

If you haven't already generated SSL certificates, use OpenSSL or `mkcert` to create them. For example, using OpenSSL:

```bash
openssl req -x509 -newkey rsa:4096 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes -subj "/CN=localhost"
```

## Step 3: Start `http-server` with HTTPS

1. Open a new terminal window and navigate to your Next.js project directory.

2. Run the following command to start the `http-server` with HTTPS enabled:

   ```bash
   http-server -a localhost -p 3000 --ssl --cert localhost-cert.pem --key localhost-key.pem
   ```

   - `-a localhost`: Specifies the host to use.
   - `-p 3000`: Specifies the port (you can change it if you prefer a different port).
   - `--ssl`: Enables HTTPS.
   - `--cert` and `--key`: Specify the paths to your SSL certificate and key files.

## Step 4: Access Your Next.js App

Your Next.js app should now be accessible via `https://localhost:3000`.

## Note

- This setup is intended for local development purposes only. When deploying your application to a production environment, you should obtain a valid SSL certificate from a trusted certificate authority.
