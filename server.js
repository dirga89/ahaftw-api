const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { json } = require('express');

// const register = require('./controllers/register');
const login = require('./controllers/login');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');

// const db = knex({
//     client: 'pg',
//     connection: {
//         host : 'db-postgresql-sgp1-15352-do-user-13155646-0.b.db.ondigitalocean.com',
//         port : 25060,
//         user : 'soelak',
//         password : 'AVNS_-5uWaHdDMgbBeMj2FYL',
//         database : 'facerecognition-db',
//         ssl: { rejectUnauthorized: false }
//     }
//   });

const app = express();

const port = process.env.PORT || 4001

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>
{
    //res.send(db.select('*').from('users').then());
    res.send('it is connected');
})

// app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.get('/login', (req, res) => { login.handleLogIn(req, res)})

// app.post('/login', (req, res) => { signin.handleLogIn(req, res, db, bcrypt) })

// app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// app.post('/imageapi', (req, res) => { image.handleImageApi(req, res) })

app.listen(port, () =>
{
    console.log(`app running on ${port}.`);
});