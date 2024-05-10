// fichier ./middleware/authentifcation.js
const secret =require('../config/secret.js');

const authentification = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (!authheader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
    }
    else {
      /*extraire la partie credentials de la propriété "authorization", en en supprimant la partie Basic située au début, décoder le Base64 */
      const credentials  = new Buffer.from(authheader.split(' ')[1],'base64').toString();
      const [user,password] = credentials.split(':');
      if (user === secret.user && password === secret.password) {
          // let's continue
          next();
      } else {
        // mauvais user name ou password
        res.setHeader('WWW-Authenticate', 'Basic realm="mon site à moi", charset="UTF-8"');
        res.status(401).end();
      }
    }
}

module.exports = authentification;
