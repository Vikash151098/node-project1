const express = require('express');
const db = require('../../model/db');
const router = express.Router();
const Joi = require('joi');
const bcrypt=require('bcryptjs');

router.post('/', async (req, res) => {

    const { error } = validateuser(req.body);
    if (error) return res.status(400).send({status:400,
      message:'Failure',
      data:error.details[0].message});

    let user=await db.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already Registered.');
    
      const salt=await bcrypt.genSalt(10);
      const hashed=await bcrypt.hash(req.body.password,salt);
    
     user =new  db({
        username: req.body.username,
        email:req.body.email,
        password: hashed,
        date:req.body.date,
        role:req.body.role
    });
try{
    user = await user.save();
  }
  catch(ex)
  {
    res.send(ex);
  }
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({ message: 'User Created succesfully',status:
  `${res.statusCode}`, detail: user});

});

function validateuser(userdetail) {
  const schema = {
      username: Joi.string().alphanum().min(5).max(30).required(),
      // pass: Joi.string().regex(/[a-zA-Z0-9]{5-30}/)
      email:Joi.string().email().required(),
      password: Joi.string().alphanum().min(5).max(30).required(),
      date:Joi.date(),
      role:Joi.string().required()

  }
  return Joi.validate(userdetail, schema);
}

module.exports = router;
