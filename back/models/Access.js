const mongoose = require('mongoose');

const AccessSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'access' });  // Ensure it uses the correct collection name

const AccessModel = mongoose.model('access', AccessSchema);
module.exports = AccessModel;
