//Librerias/modulos
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


//inicialización(es)
const app = express();
app.set('views', path.join(__dirname, 'views'));

//configuraciones
app.set('port', process.env.PORT || 4000);
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: 'hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

//middlewares
app.use(morgan('dev'));

//Aceptar los datos de los formularios mediante encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//variables Globales
app.use(((req, res, next) => {
    next();
}));


//rutas
app.use(require('./routes'));
app.use('/auth', require('./routes/authentication'));
app.use('/reg', require('./routes/registros'));


//public
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'), () => {
    console.log('server listening on port', app.get('port'));
});