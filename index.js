import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import hotelRoutes from './routes/hotels.js'
import userRoutes from './routes/user.js'

const port = process.env.PORT || 8000;
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/bio-auth-hotelbooking', {
    useNewUrlParser: true,
  })
  .then((db) => {
    console.log('Connected to database');
  })
  .catch((error) => handleError(error));

app.use(cors());
app.use(express.json());

app.use("/hotels", hotelRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});