const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();
const PORT = 3000;
const JWT_SECRET = "VC31XPrKgBgihhGpuD89NtCjWS" // ToDo: à cacher

app.use(cors({
    origin: "http://localhost:4200",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));

app.use(bodyParser.json());

// Connexion BDD
mongoose.connect("mongodb://localhost:27017/youtoine", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Schema + model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

// Quand besoin de vérifier token:
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access denied, no token provided."});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: "Invalid token" });
    }
};

// Routes
app.get("/", (req, res) => {
    res.send('Hello from Node.js');
});

app.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Protected", user: req.user, users });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username: not found."});

        const isMatch = await password == user.password;
        if (!isMatch) return res.status(400).json({ message: "Invalid password."});

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});