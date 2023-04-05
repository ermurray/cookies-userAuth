const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`My Fancy Cookie Server is listening on port: ${PORT}`));

const users = {
  123: {
    id: '123',
    name: 'Morty',
    email: 'morty@notRick.com',
    password: 'notCats'
  },
  234: {
    id: '234',
    name: 'Bender',
    email: 'bender@robot.com',
    password: 'cigar'
  }
}

const findUserByEmail = (email) => {
  for(const userId in users) {
    if(users[userId].email === email){
      return users[userId]
    }
  }
  return null;
};


app.get('/', (req, res) => {
  console.log('hey im here in root');

  res.render('index', {cookies: null});
});

app.get('/home', (req, res) => {
  console.log('cookies obj ======>', req.cookies);

  res.render('index', {cookies: req.cookies})
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/protected', (req, res) => {
  const user = req.cookies.user;
  console.log('user', user);

  if (!user) {
    return res.status(401).send("you cant be here");
  }
  const dbUser = users[user.id]

  console.log('dbUser', dbUser);
  if (!dbUser) {
    return res.status(401).send('Invalid cookie');
  }

  res.render('protected');
});


app.post('/login', (req, res) => {
  console.log('req.body', req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send("email and/or password can not be blank")
  }
  
  const user = findUserByEmail(email);
  console.log('user obj', user);

  if(user.password !== password){
    return res.status(400).send("password does not match")
  }

  res.cookie('user', {id: user.id, name: user.name})
  res.redirect('/home')
});

app.post('/logout', (req, res) => {
  // clear our cookies so user appears logged out
  res.clearCookie('user');
  res.redirect('/login')
});