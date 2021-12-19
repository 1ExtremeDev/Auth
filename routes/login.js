const express = require('express');
const router = express.Router();
const Joi = require('joi');
const UsrModel = require("./models/main");
const bcrypt= require('bcrypt');
router.post('/', async (req, res) => {
	const { error } = validateLogin(req.body);
	if(error) {res.status(400).json({err:error.details[0].message});return;}
    const usr = await UsrModel.findOne({username: req.body.username});
    if(!usr) return res.status(400).json({err:"Wrong login information"});
    const time = Date.now()-2592000000;
    try {
        const day = usr.bought;
        if (day === undefined || time >= day.getTime()) {usr.isExpired = true;usr.save();}}
    catch {res.status(500).json({err:"Some Internal problems"});}
    const validPassword = await bcrypt.compare(req.body.password,usr.password);
    if(!validPassword) return res.status(400).json({err:"invalid username/password"});
    User = await UsrModel.findOne({username:req.body.username});
    if (!usr.hwid) {HWID={hwid:req.body.hwid};const user = await UsrModel.findOneAndUpdate({username: req.body.username},{hwid:req.body.hwid},{useFindAndModify:false});try {res.json({status:"User Logged Successfully",username:user.username,Premium:user.Premium,Expired:user.isExpired});} catch (ex) {res.status(400).json({err:ex.message});}}
    if (usr.hwid===req.body.hwid) {res.json({status:"User logged in successfully",username:User.username,Premium:User.Premium,Expired:User.isExpired});}
    else {res.status(400).json({status:"Please try logging from your own machine"})}
});
function validateLogin(Obj) {const schema = Joi.object().keys({username: Joi.string().min(3).required(),password: Joi.string().min(6).required(),hwid: Joi.string().length(36).required()});return schema.validate(Obj);}
module.exports = router;