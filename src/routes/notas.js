const express = require('express');
const router = express.Router();

const Note = require('../models/note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes');
});

router.post('/notes/new-notes', (req, res) => {
    //console.log(req.body); //se obtiene los objetos recivido por el usuario

    //creo una constante donde le pido al cuerpo el title del formulario
    // y su description
    const { title, description} = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: `please write a title`});
    }
    if(!description){
        errors.push({text: `please write a descroption`});
    }
    if(errors.length > 0){
        res.render('notes/new-notes', {
            errors,
            title, 
            description
        });
    }
    else{
        const newNotes = new Note({ title, description});
        //guardar en mongodb
        //con save()
        newNotes.save();
        req.flash('success_msg', 'Nota agregada satisfactoriamente');
        res.redirect('/notes');
    }
});

router.get('/notes', async (req, res) => {
    const notes = await Note.find().sort( {date: 'DESC'} ); //Notes es la conexion Shema de node.js
    res.render('notes/all-notes', {notes});
});

//editar notas
router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-notes', {note});
});
    //actulizamos las notas despues de editarlas en el servidor
router.put('/notes/edit-notes/:id', async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description }); 
    //una vez actualizadas en el servidor redireccionamos
    res.redirect('/notes');   
});

//eliminar la nota
router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes');
});

module.exports = router;