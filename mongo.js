const mongoose = require("mongoose");
const mongoDBErrors = require('mongoose-mongodb-errors');
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect(process.env.MONGOURI);