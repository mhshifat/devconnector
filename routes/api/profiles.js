// Import External Dependencies
const express = require("express");

// Setup Express Router
const router = express.Router();

// Setup App Routes
// Route: GET /api/profiles/test
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "/api/profiles/test"
  });
});

// Export Router
module.exports = router;
