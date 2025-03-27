const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const PORT = 3000;

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

// Routes
app.get("/", (req, res) => {
    res.send('Hello from Node.js');
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
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
        if (!user) return res.status(400).json({ message: "Invalid username: not found."})


    }
    
    
    })

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});