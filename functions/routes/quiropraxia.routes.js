const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

//call db firestore
const db = admin.firestore();

//QUIROPRAXIA
// -->Add data of quiropraxia
router.post("/ekosmed/quiropraxia", async (req, res) => {
  try {
    await db
      .collection("quiropraxia")
      .doc("/" + req.body.id + "/")
      .create({
        beneficios: req.body.beneficios,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        titulo: req.body.titulo,
      });
    return res.status(204).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});
// -->List data for id of quiropraxia
router.get("/ekosmed/quiropraxia/:quiropraxia_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("quiropraxia").doc(req.params.quiropraxia_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error=>", error);
      return res.status(500).send(error);
    }
  })();
});
// -->List all data of quiropraxia
router.get("/ekosmed/quiropraxia", async (req, res) => {
  try {
    const query = db.collection("quiropraxia");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      beneficios: doc.data().beneficios,
      descripcion: doc.data().descripcion,
      imagen: doc.data().imagen,
      titulo: doc.data().titulo,
    }));
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

// -->delete data for id of quiropraxia
router.delete("/ekosmed/quiropraxia/:quiropraxia_id", async (req, res) => {
  try {
    const document = db
      .collection("quiropraxia")
      .doc(req.params.quiropraxia_id);
    await document.delete();
    return res.status(200).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

// -->update data for id of quiropraxia
router.put("/ekosmed/quiropraxia/:quiropraxia_id", async (req, res) => {
  try {
    const document = db
      .collection("quiropraxia")
      .doc(req.params.quiropraxia_id);
    await document.update({
      beneficios: req.body.beneficios,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      titulo: req.body.titulo,
    });
    return res.status(200).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

module.exports = router;
