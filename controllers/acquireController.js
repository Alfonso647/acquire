// controllers/acquireController.js
const { getModelInfo, acquire } = require("../services/tfModelService");
const dataModel = require("../model/dataModel")

function health(req, res) {
  res.json({
    status: "ok",
    service: "acquire"
  });
}


async function data(req, res) {
  const start = Date.now();

  try {
    const info = getModelInfo();
    if (!info.ready) {
      return res.status(503).json({
        error: "Model not ready",
        ready: false
      });
    }

    const { features, meta } = req.body;

    if (!features) {
      return res.status(400).json({ error: "Missing features" });
    }
    if (!meta || typeof meta !== "object") {
      return res.status(400).json({ error: "Missing meta object" });
    }

    const { featureCount } = meta;

    if (featureCount !== info.inputDim) {
      return res.status(400).json({
        error: `featureCount must be ${info.inputDim}, received ${featureCount}`
      });
    }

    if (!Array.isArray(features) || features.length !== info.inputDim) {
      return res.status(400).json({
        error: `features must be an array of ${info.inputDim} numbers`
      });
    }

    const prediction = await predict(features);
    const latencyMs = Date.now() - start;
    const timestamp = new Date().toISOString();

    //Guardamos en MongoDB
    const predDB = await Prediction.create({
      prediction,
      timestamp,
      latencyMs
    })

    res.status(201).json({
      predictionId: predDB._id,
      prediction: predDB.prediction,
      timestamp: predDB.timestamp,
      latencyMs: predDB.latencyMs
    });
  } catch (err) {
    console.error("Error en /predict:", err);
    res.status(500).json({ error: "Internal error" });
  }
}

module.exports = {
  health,
  ready,
  doPredict
};
