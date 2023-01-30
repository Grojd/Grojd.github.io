// Knihovny / moduly //
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { User, Record, Language } = require('./models/models');

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
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

// Routes //


// Renderovani //

app.get('/', async (req, res) => {
    const records = await Record.find().populate(["user", "language"]);
    const users = await User.find();
    const languages = await Language.find();
    res.render('records/index', { records, users, languages });
});

app.get('/settings', async (req, res) => {
    const users = await User.find();
    const languages = await Language.find();
    res.render('records/settings', { languages, users });
});



// Pridani //

// Uzivatel //
app.post('/settings/user', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect('/settings');
});

app.put('/settings/user/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/settings');
});

app.delete('/settings/user/:id', async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.redirect('/settings');
});

// Jazyk //
app.post('/settings/language', async (req, res) => {
    const newLanguage = new Language(req.body);
    await newLanguage.save();
    res.redirect('/settings');
});

app.put('/settings/language/:id', async (req, res) => {
    await Language.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/settings');
});

app.delete('/settings/language/:id', async (req, res) => {
    await Language.findByIdAndDelete(req.params.id);
    res.redirect('/settings');
});


// Index - zaznamy //

app.post('/records', async (req, res) => {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.redirect('/');
})

app.put('/records/:id', async (req, res) => {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
})

app.delete('/records/:id', async (req, res) => {
    const record = await Record.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

// Port //
app.listen(3000, () => console.log('app running'));