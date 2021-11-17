const express = require("express");
const { getTuits, createTuit } = require("../controllers/tuitControllers");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", createTuit);

module.exports = router;
