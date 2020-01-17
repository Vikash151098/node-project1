
const express = require('express');
const db = require('../../model/db');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {

    try{

    
    const { error } = validateuser(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: 'Failure',
        data: error.details[0].message
    });

    let email = req.body.email;
    let password = req.body.password;

    const userdetail = await db.findOne({ email: email });
    if (!userdetail) return res.status(400).send({
        message: 'Failure',
        data: 'Invalid email or Password',
        statuscode: 400
    });

    //validate 
    //if invalid return 400 Bad Request 

    const isValidpassword = await bcrypt.compare(password, userdetail.password);
    if (!isValidpassword) return res.send({
        status: `${res.statusCode}`,
        message: ' Invalid Email or password.'
    });

    const token = userdetail.generateAuthToken();

    res.header('x-auth-token', token).send({
        message: 'sucess',
        data: 'sucessfully logged in...',
        status: `${res.statusCode}`, detail: userdetail
    });
}
catch(ex)
{
    //log the exceptions
    res.status(500).send('something failed.');
}
});

function validateuser(user) {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(5).max(30).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;
