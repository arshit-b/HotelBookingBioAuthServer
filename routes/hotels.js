import express from "express";

import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotels.js";
// import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", getHotels);
router.post("/", createHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
