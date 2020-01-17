const express=require('express');
const createuser = require('../router/user/createusers');
const logging = require('../router/user/logging');
const getuserdetails = require('../router/user/getuserdetails');
const updatepassword = require('../router/user/updateuser-password');
const deleteuser = require('../router/user/deleteuser');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/user/createuser', createuser);
    app.use('/api/user/login', logging);
    app.use('/api/user/getuserdetail', getuserdetails);
    app.use('/api/user/updatepassword', updatepassword);
    app.use('/api/user/deleteuser', deleteuser);
}