const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// Init DB
mongoose.connect('mongodb://localhost:27017/softhouse_task', { useCreateIndex: true, useNewUrlParser: true });
mongoose.set('debug', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));
db.once('open', (cb) => {
    console.log('Database connection successful')
});

// Init server
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Models & Routes
require('./db/models/user');
require('./db/models/movies');
require('./config/passport');
app.use(require('./routes'));

// Start server
app.listen(process.env.PORT || 8081);

module.exports = app;
