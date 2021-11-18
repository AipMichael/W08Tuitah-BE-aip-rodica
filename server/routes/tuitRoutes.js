const express = require("express");
const { getTuits, createTuit, deleteTuit } = require("../controllers/tuitControllers");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", createTuit);
router.delete("/delete/:id", deleteTuit);

module.exports = router;
