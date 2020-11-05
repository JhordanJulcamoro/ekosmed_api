const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert("./permissions.json"),
  databaseURL: "https://ekosmed-58431.firebaseio.com",
});

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
  return res.status(200).json({
    message: "Olá, meu nome é @JhordanJulcamoro e sou desenvolvedor. ;)",
  });
});

//QUIROPRAXIA
app.use(require("./routes/quiropraxia.routes"));
//CASOS CLINICOS
app.use(require("./routes/casos-clinicos.routes"));
//DICAS
app.use(require("./routes/dicas.routes"));

exports.app = functions.https.onRequest(app);
