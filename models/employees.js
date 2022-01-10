const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Weights', { useNewUrlParser: true });
const wSchema = new mongoose.Schema({
    empName: String,
    empPass: String,
    created: { type: Date, default: Date.now }
},{
    collection: "Employees"
});

module.exports = mongoose.model('Employees', wSchema);