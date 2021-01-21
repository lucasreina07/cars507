const express = require('express');
const router = express.Router();

//este enrrutador nos hace crear rutas de nuestra
//propiedades

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;