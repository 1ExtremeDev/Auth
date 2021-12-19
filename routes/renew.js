const express = require('express');const router = express.Router();const Joi = require('joi');const UsrModel = require('./models/main');const dotenv = require('dotenv');dotenv.config();
router.post('/', async (req,res) => {
    if (req.body.secret != process.env.RENEWAL) {res.status(401).json({status:"You're not authorised"});return;}const { error } = validateRenew(req.body);
    if (error) {res.status(400).json({err:error.detail[0].message});return;}const usr = await UsrModel.findOne({username: req.body.username});
    if(!usr) {res.status(400).json({status:"Check if the user exists"});return;}
    try {let renew= Date.now();usr.isExpired=false;usr.bought=renew;usr.save();let expiry=new Date(renew+2592000000)
        res.json({status:"Updated",username:usr.username,Premium:usr.Premium,expires:expiry.toDateString()});}
    catch (ex) {res.status(500).json({err:ex.message});}
});
function validateRenew(Req) {const schema = Joi.object().keys({username:Joi.string().min(3).required(),secret: Joi.string().valid(process.env.RENEWAL)});return schema.validate(Req);}
module.exports= router;