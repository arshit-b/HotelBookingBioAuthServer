// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import NodeRSA from 'node-rsa';

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, signature, payload } = req.body;

  try {
    const user = await UserModal.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User doesn't exist" });
    // if (!isPasswordCorrect)
    //   return res.status(400).json({ message: "Invalid credentials" });
    // const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
    //   expiresIn: "1h",
    // });
    const publicKey = user.publicKey;
    const publicKeyBuffer = Buffer.from(publicKey, 'base64')
    const key = new NodeRSA()
    const signer = key.importKey(publicKeyBuffer, 'public-der')
    const signatureVerified = signer.verify(Buffer.from(payload), signature, 'utf8', 'base64')
    res.status(200).json({ result: signatureVerified });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, firstName, lastName, publicKey } = req.body;
  console.log(req.body);
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const result = await UserModal.create({
      email,
      name: `${firstName} ${lastName}`,
      publicKey,
    });
    // const token = jwt.sign({ email: result.email, id: result._id }, secret, {
    //   expiresIn: "1h",
    // });

    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

};
