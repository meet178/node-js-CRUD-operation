const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://meetlathiya:atlas%40123@cluster0.lwta9mq.mongodb.net/DataBase?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;