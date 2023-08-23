const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`MY FANCY COOKIE SERVER NOM NOM is listening on port ${PORT}`));

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
  for (const userId in users) {
    if(users[userId].email === email) {
      return  users[userId]
    }
  }
  return null;
};

app.get('/', (req, res) => {
  const user  = req.cookies.user ? JSON.parse(req.cookies.user) : null;
  console.log('user', user);

  // if(!user) {
  //   return res.render('index', {userId: null, name: null});
  // }
  
  res.render('index', {userId: user?.id, name: user?.name}); // optional chaining https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
});

app.get('/login', (req, res) => {
   res.render('login');
});

app.get('/protected', (req, res) => {
  const user = req.cookies.user;
  if(!user) {
    return res.status(401).send("you can't be here");
  }
  const parsedUser = JSON.parse(user);
  const existingUser = users[parsedUser.id]

  if(!existingUser) {
    res.clearCookie('user')
    return res.redirect('/register')
  }
  res.render('protected');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send('email and/or password can not be blank');
  }

  const user = findUserByEmail(email);

  // if(user === null) {
  //   return res.status(401).send('not found');
  // }

  if(user.password !== password) {
    return res.status(400).send('incorrect password or user does not exist');
  }


  res.cookie('user', JSON.stringify({id: user.id, name: user.name}));
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/login');
});
