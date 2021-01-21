const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash =  require('connect-flash');
const passport = require('passport');


//initializations = inicializaciones
const app = express();
require('./database');
require('./config/passport');

//setting
    //nos dice que si ay un puerto funcioal en 
    //consola que lo utilice o el port 3000
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      } //importante 
}));
app.set('view engine', '.hbs');

//middleware
    //nos funciona para que un usuario se quiera registrar
    //yo pueda recibir esos datos
app.use(express.urlencoded({ 
    extended: false 
})); 
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.erros_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


//routes = rutas
app.use(require('./routes/index'));
app.use(require('./routes/notas'));
app.use(require('./routes/users'));


//static files
app.use(express.static(path.join(__dirname, 'public')));


//server is listining = servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});