// Import External Dependencies
const express = require("express");

// Setup Express Router
const router = express.Router();

// Setup App Routes
// Route: GET /api/posts/test
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "/api/posts/test"
  });
});

// Export Router
module.exports = router;
