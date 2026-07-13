import express from "express";

const router = express.Router();

router.post("/context", async (req, res) => {
  try {
    const payload = req.body;

    return res.json({
      success: true,
      message: "Clinical context saved",
      data: payload
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;