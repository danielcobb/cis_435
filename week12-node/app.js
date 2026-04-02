import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const terms = [
    'baseball',
    'basketball',
    'soccer',
    'football',
    'hockey',
];

const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next();
});

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello from express');
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(`User ID: ${id}`);
});

app.get('/users/:id/posts/:postId', (req, res) => {
    const {id, postId} = req.params;
    res.send(`User ${id}, Post ${postId}`);
});

app.get('/search', (req, res) => {
    const term = req.query.term;
    //res.send(`Searching for ${term}`);

    if (terms.includes(term)){
        res.send(`Found ${term}`);
    }
    else{
        res.send(`Couldn't find ${term}`)
    }
});

app.get('/api/users', (req, res) => {
    res.json([
        {id: 1, name: 'Alice'},
        {id: 2, name: 'Bob'},
    ]);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body

    console.log(newUser)

    res.json({
        message: "User received",
        name: newUser.name,

    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});