import { Router } from "express";
import {
  createLinks,
  getLink,
  updateLink,
  getStats,
  deleteLink,
} from "../controllers/linkController";

const router = Router();

router.post("/", createLinks);
router.get("/:shortCode", getLink);
router.patch("/:shortCode", updateLink);
router.get("/:shortCode/stats", getStats);
router.delete("/:shortCode", deleteLink);

export default router;
