import express from "express";
import mongoose from "mongoose";

import hotels from "../models/hotels.js";

const router = express.Router();

export const getHotels = async (req, res) => {
  try {
    const allHotels = await hotels.find();
    res.status(200).json(allHotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await hotels.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHotel = async (req, res) => {
  const post = req.body;
  const newHotel = new hotels({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newHotel.save();

    res.status(201).json(newHotel);
  } catch (error) {
    console.log("error", error);
    res.status(409).json({ message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, location, price,details, selectedFile, rating } = req.body;

  console.log(req.params, req.body);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { name, location, price,details, selectedFile, rating, _id: id };

  await hotels.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await hotels.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
