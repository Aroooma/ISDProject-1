const Schema = require("mongoose").Schema;
module.exports = new Schema({
	name: String,
	ph : String,
	phquality : String,
	oxygen : String,
	oxygenquality : String,
	nitrogen : String,
	nitrogenquality : String,
	permangan : String,
	permanganquality : String,
	orgacarbon : String,
	orgacarbonquality : String,
	date : String,
	time : String
});
