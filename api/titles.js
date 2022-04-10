const router = require("express").Router();
const Controller = require("../controllers");

router.get("/all", Controller.Title.getAllTitles);
router.get("/:search", Controller.Title.searchTitle);
router.post("/issue", Controller.Title.issueTitle);

module.exports = router;
