const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    product: String,
    quantity: Number,
    price: Number,
    material: String
});

const ItemModel = mongoose.model("items", ItemSchema);
module.exports = ItemModel;
