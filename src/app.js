const express = require('express');
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const routes = require('./routes/main'); // Ensure this path is correct
const Schema = mongoose.Schema; 
// Serve static files from the 'public' directory
app.use('',routes);
app.use('/static', express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set template engine to hbs (Handlebars)
app.set('view engine', 'hbs');
app.set("views", "views");
hbs.registerPartials("views/partials");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/website_tut", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

// Define the User schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    Gmail: {
        type: String,
        required: false,
    },
    Phone: {
        type: String,
        required: false,
    },
    Type: {
        type: String,
        required: false,
    }
});

const User = mongoose.model("User", LoginSchema);



const cartSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
  });

  const Cart=mongoose.model("Cart",cartSchema);





app.post("/sig", async (req, res) => {
    try {
        const { username, password, gmail, phone, type } = req.body;

        // Input validation
        if (!username || !password || !gmail || !phone || !type) {
            return res.status(400).send("All fields are required");
        }

        const existingUser = await User.findOne({ name: username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        } else {
            const saltRounds = 10;
            const hashpass = await bcrypt.hash(password, saltRounds);
            const newUser = new User({ name: username, password: hashpass, Gmail: gmail, Phone: phone, Type: type });
            await newUser.save();
            console.log(newUser);
            res.redirect('/');
        }
    } catch (error) {
        res.redirect('/login');
    }
});

app.post("/log", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Input validation
        if (!username || !password) {
            return res.status(400).send("Username and password are required");
        }

        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(400).send("Invalid credentials");
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
});





app.listen(5556, () => {
    console.log("Server started on port 5556");
});
