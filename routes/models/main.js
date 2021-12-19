const mongoose = require('mongoose');const dotenv = require('dotenv');dotenv.config();
mongoose.connect(process.env.DB_LINK,
                {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("Connected to Database..."))
    .catch(err => console.error(`Can't connect`));
mongoose.set('useCreateIndex', true);
const DbSchema = new mongoose.Schema({username: { type: String, required: true,unique: true,minlength: 3,maxlength: 255, },password: {type: String,required: true,minlength:1},hwid: {type: String,minlength:35,maxlength:37},Premium: {type: Boolean,default: false},bought: {type: Date,default:undefined},isExpired: {type:Boolean,default:true}});
module.exports = mongoose.model('Users',DbSchema);
	