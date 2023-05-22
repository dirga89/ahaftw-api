require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knex = require('knex');
const { json } = require('express');

const verifyToken = require('./controllers/authMiddleware');
// const register = require('./controllers/register');
const login = require('./controllers/login');
const user = require('./controllers/user');
// const profile = require('./controllers/profile');
// const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : 'ec2-54-208-11-146.compute-1.amazonaws.com',
        port : 5432,
        user : 'pfuwxvrtoynnxi',
        password : '1e279abaf42c4ceaeae100ff12ff2b09e734b8f4270ae69078f62f54650471b8',
        database : 'd52ivesgs26mdt',
        ssl: { rejectUnauthorized: false }
    }
  });
  
const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(cors());


app.get('/', (req, res) =>
{
    //res.send(db.select('*').from('users').then());
    res.send('it is connected');
})

// app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.get('/user', verifyToken, (req, res) => { user.getUsers(req, res, db) });

// REGISTER A USER
app.post("/user", (req, res) => { user.postUser(req, res, db) });

app.post('/login', (req, res) => { login.handleLogIn(req, res, db, bcrypt) });

// app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// app.put('/image', (req, res) => { image.handleImage(req, res, db) })

// app.post('/imageapi', (req, res) => { image.handleImageApi(req, res) })

app.listen(port, () =>
{
    console.log(`server running on ${port}.`);
});