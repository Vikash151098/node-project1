
const express = require('express');
const db = require('../../model/db');
const Joi = require('joi');
const auth=require('../../middleware/auth');
const router = express.Router();
Joi.objectId=require('joi-objectid')(Joi);

router.delete('/',auth, async (req, res) => {
  const { error } = validateid(req.body);
  if (error) return res.status(400).send({status:400,
    message:'Failure',
    data:error.details[0].message});

  const user = await db.findByIdAndRemove(req.body.id);

  if (!user) return res.status(404).send({
    message: 'Failure',
    data: 'The user with the given ID was not found.',
    status: 404
  });

  res.send({
    message: 'deleted succesfully', status:
      `${res.statusCode}`, detail: user
  });
});

function validateid(id) {
  const schema = {
    id: Joi.objectId().required()
  };
  return Joi.validate(id, schema);
}
module.exports = router;