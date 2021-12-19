const express = require('express');const router = express.Router();const Joi = require('joi');const UsrModel = require("./models/main");const dotenv = require('dotenv');dotenv.config();
router.post('/', async (req, res) => {
    if (req.body.secret!=process.env.R_HWID) {res.status(401).json({status:"You aren't authorised"});return;}const { error } = validateReq(req.body);
	if(error) {res.status(400).json({err:error.details[0].message});return;}
    const usr = await UsrModel.findOne({username: req.body.username});
    if(!usr) {res.status(400).json({err:"User doesn't exists"});return;}
    try {usr.hwid=undefined;await usr.save();res.json({status:"HWID reset operation successfully finished",username:req.body.name});} catch (ex) {res.status(400).json({err:ex.message});}
});

function validateReq(Obj) {const schema = Joi.object().keys({username: Joi.string().min(3).required(),secret: Joi.string().valid(process.env.R_HWID)});return schema.validate(Obj);}
module.exports = router;