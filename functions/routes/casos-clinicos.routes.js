const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

//call db firestore
const db = admin.firestore();

//CASOS CLINICOS
// -->Add data of casos clínicos
router.post("/ekosmed/casos-clinicos", async (req, res) => {
  try {
    await db
      .collection("casos-clinicos")
      .doc("/" + req.body.id + "/")
      .create({
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        sintomas: req.body.sintomas,
        tratamientos: req.body.tratamientos,
        contraindicaciones: req.body.contraindicaciones,
        cuidadosimportantes: req.body.cuidadosimportantes,
      });
    return res.status(204).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});
// -->List data for id of casos clínicos
router.get("/ekosmed/casos-clinicos/:casos_clinicos_id", (req, res) => {
  (async () => {
    try {
      const doc = db
        .collection("casos-clinicos")
        .doc(req.params.casos_clinicos_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error=>", error);
      return res.status(500).send(error);
    }
  })();
});
// -->List all data of casos clínicos
router.get("/ekosmed/casos-clinicos", async (req, res) => {
  try {
    const query = db.collection("casos-clinicos");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      titulo: doc.data().titulo,
      imagen: doc.data().imagen,
      descripcion: doc.data().descripcion,
      sintomas: doc.data().sintomas,
      tratamientos: doc.data().tratamientos,
      contraindicaciones: doc.data().contraindicaciones,
      cuidadosimportantes: doc.data().cuidadosimportantes,
    }));
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

// -->delete data for id of casos clínicos
router.delete(
  "/ekosmed/casos-clinicos/:casos_clinicos_id",
  async (req, res) => {
    try {
      const document = db
        .collection("casos-clinicos")
        .doc(req.params.casos_clinicos_id);
      await document.delete();
      return res.status(200).json();
    } catch (error) {
      console.log("Error=>", error);
      return res.status(500).send(error);
    }
  }
);

// -->update data for id of quiropraxia
router.put("/ekosmed/casos-clinicos/:casos_clinicos_id", async (req, res) => {
  try {
    const document = db
      .collection("casos-clinicos")
      .doc(req.params.casos_clinicos_id);
    await document.update({
      titulo: req.body.titulo,
      imagen: req.body.imagen,
      descripcion: req.body.descripcion,
      sintomas: req.body.sintomas,
      tratamientos: req.body.tratamientos,
      contraindicaciones: req.body.contraindicaciones,
      cuidadosimportantes: req.body.cuidadosimportantes,
    });
    return res.status(200).json();
  } catch (error) {
    console.log("Error=>", error);
    return res.status(500).send(error);
  }
});

module.exports = router;
