
const express = require('express');
const db = require('../../model/db');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const router = express.Router();

router.get('/', async (req, res) => {
    const userDetails = await db.find().sort('name');

    res.send({
        message: 'sucess',
        data: 'succesfully',
        status: `${res.statusCode}`, detail: userDetails
    });
});
router.get('/:id', async (req, res) => {
    const { error } = validateid(req.params);
    if (error) return res.status(400).send({status:400,
        message:'Failure',
        data:error.details[0].message});

    const userDetails = await db.findById(req.params.id);

    if (!userDetails) return res.status(404).send({
        message: 'Failure',
        data: 'The user with the given ID was not found.',
        status: 404
    });
    res.send({
        message: 'sucess',
        data: 'succesfully',
        status: `${res.statusCode}`, detail: userDetails
    });
});

function validateid(id) {
    const schema = {
        id: Joi.objectId().required()
    };
    return Joi.validate(id, schema);
}

module.exports = router;
