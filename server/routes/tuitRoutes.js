const express = require("express");
const { getTuits, createTuit, delete } = require("../controllers/tuitControllers");

const router = express.Router();

router.get("/", getTuits);
router.post("/create", createTuit);
router.post("/delete", deleteTuit);

module.exports = router;
