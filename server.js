const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password :'stefan',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=>res.json('success'))
app.get('/profiles/:id', (req, res)=> profile.handleProfile(req, res, db))
app.put('/image', (req, res)=> image.handleImage(req, res, db))
app.post('/imageurl', (req, res)=> image.handleApiCall(req, res))
app.post('/signin',(req, res)=> signIn.handleSignIn(req, res, db, bcrypt) )
app.post('/register', (req, res)=> register.handleRegister(req, res, db, bcrypt))

app.listen(process.env.PORT||4000, ()=>{
    console.log(`listening to port ${process.env.PORT}`)
})