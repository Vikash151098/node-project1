
const express = require('express');
const db = require('../../model/db');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcryptjs');
const auth=require('../../middleware/auth');
const router = express.Router();

router.put('/',auth, async (req, res) => {

    const { error } = validatepassword(req.body);
    if (error) return res.status(400).send({
        status: 400,
        message: 'Failure',
        data: error.details[0].message
    });

    let userDetail = await db.findById(req.body.id);
    if (!userDetail) return res.status(404).send({ message: 'Failure', status: 404, data: 'the given ID was not found' });

    const isvalidpassword = await bcrypt.compare(req.body.old_password, userDetail.password);
    if (isvalidpassword) {
        userDetail.set({ password:await bcrypt.hash(req.body.new_password, await bcrypt.genSalt(10))});
         userDetail = await userDetail.save();
    }
    else {
        return res.status(404).send({ message: 'Failure', status: 404, data: 'the given Old Password is Incorrect.' });

    }
    res.send({
        message: 'sucess',
        data: 'User Password Updated Sucessfully',
        status: `${res.statusCode}`,
        userDetail
    });
});
function validatepassword(userpassword) {
    const schema = {
        id: Joi.objectId().required(),
        old_password: Joi.string().alphanum().min(5).max(30).required(),
        new_password: Joi.string().alphanum().min(5).max(30).required()

    }
    return Joi.validate(userpassword, schema);
}

module.exports = router;
