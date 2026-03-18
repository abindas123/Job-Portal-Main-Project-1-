import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

function SignToken(user) {
  return jwt.sign(
    { UserId: user._id.toString(), role: user.role },
    process.env.JWT_SECRET
  );
}

export const register = async (req, res) => {
  try {
    const { name, email, role, password, CompanyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "name, email, password, role are required" });
    }
    if (!["candidate", "employer"].includes(role)) {
      return res.status(400).json({ message: "role must be candidate or employer" });
    }
    if (role === "employer" && !CompanyName) {
      return res.status(400).json({ message: "companyName is required for employer" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      CompanyName: role === "employer" ? CompanyName : undefined,
    });

    const token = SignToken(user);

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        CompanyName: user.CompanyName || null,
      },
      token,
    });
  } catch (err) {
    console.log("Error in register", err);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = SignToken(user);

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        CompanyName: user.CompanyName || null,
      },
      token,
    });
  } catch (err) {
    console.log("error in login", err);
    return res.status(500).json({ message: "Login Error" });
  }
};
