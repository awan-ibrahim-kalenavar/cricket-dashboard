import express from "express";
import {
  createMatch,
  getAllMatches,
  getMatchById,
  getMatchesByStatus,
  updateMatch,
  deleteMatch
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/", createMatch);
router.get("/", getAllMatches);
router.get("/status/:status", getMatchesByStatus); // ⚠️ important order
router.get("/:id", getMatchById);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;