const mongoose = require('mongoose');

//nos conectamos ala base de datos y le damos un nombre
//llamadp notes-db-app
mongoose.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

