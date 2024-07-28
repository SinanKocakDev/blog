import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios"
import nodemailer from "nodemailer"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
  };

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const exist = await User.findOne({ username });
  if (exist) {
    return res.status(400).json({ error: "Username is already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {

    const user = await User.create({ username, password: hashedPassword });

    const token = createToken(user._id)

    res.status(201).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req,res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "Incorrect username." });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect password." });
  }

  try {
    const token = createToken(user._id)

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const contact = async (req,res) => {
  try {
    const { token, name, email, message } = req.body;

    if (!token) {
      return res.status(400).json("Recaptcha token is required");
    }
    const secretKey = process.env.CAPTCHA_SECRET_KEY ;
    const { data, status, statusText } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    if (data.success) {

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GOOGLE_AUTH_USER,
          pass: process.env.GOOGLE_AUTH_PASS
        }
      });
      let mailOptions = {
        from: `${email}`,
        to:  process.env.GOOGLE_AUTH_USER ,
        subject: `${email}`,
        text: `Gönderen isim : ${name}. Maili gönderen: ${email}. Mesaj içeriği : ${message}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ error: error.message });
        }
      });

    } else {

      return res.status(400).json({ data, message: "Invalid recapthca" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("Failed! recaptcha error");
  }
}