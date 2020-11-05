const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

//call db firestore
const db = admin.firestore();

//DICAS
// -->Add data of dicas
router.post("/ekosmed/dicas", async (req, res) => {
  try {
    await db
      .collection("dicas")
      .doc("/" + req.body.id + "/")
      .create({
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        beneficios: req.body.beneficios,
        pasos: req.body.pasos,
        calificar: req.body.calificar,
      });
    return res.status(204).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});
// -->List data for id of dicas
router.get("/ekosmed/dicas/:dica_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("dicas").doc(req.params.dica_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error=>", error);
      return res.status(500).send(error);
    }
  })();
});
// -->List all data of dicas
router.get("/ekosmed/dicas", async (req, res) => {
  try {
    const query = db.collection("dicas");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      beneficios: doc.data().beneficios,
      pasos: doc.data().pasos,
      descripcion: doc.data().descripcion,
      imagen: doc.data().imagen,
      titulo: doc.data().titulo,
      calificar: doc.data().calificar,
    }));
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});
// -->delete data for id of dicas
router.delete("/ekosmed/dicas/:dica_id", async (req, res) => {
  try {
    const document = db.collection("dicas").doc(req.params.dica_id);
    await document.delete();
    return res.status(200).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});
// -->update data for id of dicas
router.put("/ekosmed/dicas/:dica_id", async (req, res) => {
  try {
    const document = db.collection("dicas").doc(req.params.dica_id);
    await document.update({
      beneficios: req.body.beneficios,
      pasos: req.body.pasos,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      calificar: req.body.calificar,
    });
    return res.status(200).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

module.exports = router;
