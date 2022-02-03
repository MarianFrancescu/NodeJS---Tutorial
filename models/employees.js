const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Weights', { useNewUrlParser: true });

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
  }

const wSchema = new mongoose.Schema({
    empName: String,
    empPass: String,
    created: { type: Date, default: Date.now },
    role: { type: String, default: ROLE.BASIC },
	empWeights: [{date: Date, weight: Number}]
},{
    collection: "Employees"
});

module.exports = mongoose.model('Employees', wSchema);