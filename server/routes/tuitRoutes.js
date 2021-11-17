const express = require("express");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", createTuit);

module.exports = router;
