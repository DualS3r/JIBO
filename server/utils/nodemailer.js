const nodemailer = require("nodemailer");

async function main(email, worker_id, company_id) {
  let transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST, //hosting para gmail
    port: 465, // puerto que utiliza gmail
    secure: true, //true for port 465, false para otro puerto
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "XXXXXXXXXXXXXX@XXXXXXX.com",
    to: email,
    subject: "¡Inscríbete a esta oferta!",
    html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <h2>¡Hola!</h2>
        <p>Hay una empresa interesada en tu perfil!</p>
        <p>Pincha en el siguiente enlace para descubrir sus ofertas publicadas:</p>
        <a href=${`http://localhost:5173/workerProfile/${worker_id}/offersReceived/${company_id}`} >Descubre un mundo de posibilidades</a>
      </body>
    </html>`,
  });
  console.log(info);
}

module.exports = main;
