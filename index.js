require('dotenv').config();

const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const cMiddleware = require('./config/middleware');

app.use(express.urlencoded());

// serving static files
app.use(express.static('./assets'));

// use expressLayouts middleware
app.use(expressLayouts);
// extract styles and scripts from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'postIt',
    secret: 'nepo_ian',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(function (request, response, next) {
    if (request.isAuthenticated) {
        response.locals.user = request.user;
    }
    next();
})

app.use(flash());
app.use(cMiddleware.setFlash);


const myRouter = require('./routes');
app.use('/', myRouter);

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the server at ${port}: ${error}`);
        return;
    }

    console.log(`Server is running at port ${port}`);
})