// Knihovny / moduly //
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Record = require('./models/record');

// Databáze //
mongoose.set('strictQuery', true); // vypnutí varování //
mongoose.connect('mongodb://localhost:27017/app')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

// Funkce ke spuštění serveru ?? //
const app = express();

// Middleware //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Routes //

app.get('/', async (req, res) => {
    const records = await Record.find();
    res.render('ejs/index', { records });
});

// Port //
app.listen(3000, () => console.log('app running'));