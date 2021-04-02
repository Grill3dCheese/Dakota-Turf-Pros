const express = require("express"),
  router = express.Router();

// Contact Route
router.get("/contact", (req, res) => {
  res.render("contact");
});

module.exports = router;
