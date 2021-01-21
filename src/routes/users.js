const express = require('express');
const router = express.Router();

const Users = require('../models/users');
const passport = require('passport')

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes', 
    failureRedirect: '/users/signin',
    failureFlash: true
}));

///////////////////////////////////////////
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors =[];
    console.log(req.body);
    if(name.length <= 0){
        errors.push({text: 'inserte nombre por favor'});
    }
    if(password !== confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4 ) {
        errors.push({text: 'debe ser mayor a 4 caracteres'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }
    else{
        const emailUser =await Users.findOne(
                { email: email }
            );
        if(emailUser) {
            req.flash('error_msg', 'el correo ya existe');
            res.redirect('/users/signup');
        }
        const newUser = new Users({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'estas registrado');
        res.redirect('/users/signin');
    }
});

module.exports = router;