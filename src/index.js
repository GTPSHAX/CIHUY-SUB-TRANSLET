require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');

const { APP_HOST, APP_PORT } = require('./constant.js');
const globalVars = require('./global.js');
const { appLog } = globalVars;
const router = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes
app.use('/', router);

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(APP_PORT, APP_HOST, () => {
  const msg = `Server started on http://${APP_HOST === '0.0.0.0' ? 'localhost' : APP_HOST}:${APP_PORT}`;
  
  appLog.info(msg);
  console.log(msg);
});

module.exports = app;
