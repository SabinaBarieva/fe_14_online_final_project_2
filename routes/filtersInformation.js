const express = require("express");
const router = express.Router();
const { filtersInformation } = require("../controllers/filtersInformation");

router.get("/", filtersInformation);
module.exports = router;
