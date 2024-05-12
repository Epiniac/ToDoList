// ce ficher est un test de chargement des certificats afin de garantir une sécurité lors de la connexion
// bref à pas toucher pour l'instant
const https = require('https');
const fs = require('fs');

// chargement des certificats
const privateKey  = fs.readFileSync('./certs/certificat.key', 'utf8');
const certificate = fs.readFileSync('./certs/certificat.crt', 'utf8');

// création du serveur HTTPS
const credentials = {
                      key : privateKey,
                      cert : certificate
                    };
const securedHttpsServer = https.createServer(
  credentials,
  (request, response) => {
    // création et envoi de la réponse
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write('<h1>HTTPS secured server</h1>');
      response.end();
  }
);

securedHttpsServer.listen(8081);
