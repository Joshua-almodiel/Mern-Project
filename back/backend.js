const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ItemModel = require('./models/Item')
const AccessModel = require('./models/Access')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/project")

app.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const existingUser = await AccessModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Already have an account" });
        }

        const newUser = new AccessModel({ fullname, email, password });
        await newUser.save();

        res.status(201).json({ message: "Account created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AccessModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json({ message: "Login successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


app.get('/home', (req, res) => {
    ItemModel.find({})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.get('/getItem/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findById({_id:id})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.delete('/deleteItem/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.put('/updateItem/:id', (req, res) => {
    const id = req.params.id;
    ItemModel.findByIdAndUpdate({_id:id}, {
        product: req.body.product, 
        quantity: req.body.quantity, 
        price: req.body.price, 
        material: req.body.material})
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

app.post("/createItem", (req, res) => {
    ItemModel.create(req.body)
    .then(items => res.json(items))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("Server is running..");
})