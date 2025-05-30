const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { dream } = req.body;
  res.json({ message: `Interpreting dream: ${dream}` });
});

module.exports = router;
