const express = require('express');const router = express.Router();const Joi = require('joi');const UsrModel = require("./models/main");const bcrypt= require('bcrypt');const dotenv = require('dotenv');dotenv.config();const SALT_ROUNDS = 12;
router.post('/', async (req, res) => {
    if (req.body.secret!=process.env.SECRET) {res.status(401).json({status:"You aren't authorised"});return;}
	const { error } = validateReg(req.body); 
	if(error) {res.status(400).json({err:error.details[0].message,valid:false});return;}
    const salt = await bcrypt.genSalt(SALT_ROUNDS);const HashedPsswd=await bcrypt.hash(req.body.password,salt);const user = new UsrModel({username: req.body.username,password: HashedPsswd,hwid: req.body.hwid,Premium:false});
	try {await user.save();res.json({status:"User Stored Successfully",username:req.body.name});}
	catch (ex) {res.status(400).json({err:ex.message});}
});

function validateReg(Obj) {const schema = Joi.object().keys({username: Joi.string().min(3).required(),password: Joi.string().min(6).required(),hwid: Joi.string().length(36),secret: Joi.string().valid(process.env.SECRET)});return schema.validate(Obj);}
module.exports = router;