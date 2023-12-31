const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
	uploadArt,
	fetchArt,
	fetchTopArtByCategory,
	fetchSingleArt,
	fetchFilteredArt,
	deleteArt
} = require("../controller/art");
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("art"), uploadArt);
router.get("/", fetchArt);
router.get("/categories", fetchTopArtByCategory);
router.get("/filteredArt", fetchFilteredArt);
router.get("/singleArt/", fetchSingleArt);
router.delete("/delete", deleteArt);
module.exports = router;
