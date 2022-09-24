// ----------------------- REQUIREMENTS
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const helmet = require('helmet');

// Fruits database
const fruitsDB = {
  a1q: {
    id: 'a1q',
    name: 'mango',
    color: 'yellow',
    emoji: '🥭'
  },
  w4f: {
    id: 'w4f',
    name: 'grape',
    color: 'purple',
    emoji: '🍇'
  }
};

// Users database
const usersDB = [
  {
    id: 123,
    email: 'user@email.com',
    password: 'abc123'
  }
];

// ----------------------- SETUP AND MIDDLEWARES
const app = express();
const port = 3000;

app.use(morgan('dev')); // middleware that logs all the requests
app.use(express.json()); // allow requests to include json body
app.use(
  cookieSession({
    name: 'session',
    keys: ['randomKey1', 'randomKey2'],

    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    maxAge: 10 * 60 * 1000 // 10 min
  })
);
app.use(helmet()); // bonus! - includes security headers (owasp)

// ----------------------- ROUTES / ENDPOINTS
app.get('/', (req, res) => {
  // cookie-session docs example
  req.session.views = (req.session.views || 0) + 1;
  res.send('<h1>Hello World! 🐳</h1><p>CRUD /api/fruits</p>');
});

app.get('/home', (req, res) => {
  res.status(200).send({ message: '🏡' });
});

// FRUITS CRUD REST API
// CREATE - POST
app.post('/api/fruits', (req, res) => {
  // Validate user is logged in by checking cookie is set
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  // Validate body properties are provided
  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to create a fruit' });
  }

  // Generate fruit id
  let id = Math.random()
    .toString(36)
    .substr(2, 3);

  // Create fruit object in DB
  fruitsDB[id] = {
    id,
    name,
    color,
    emoji,
    userId
  };

  // Response
  res.status(201).send({ message: 'Created!', fruit: fruitsDB[id] });
});

// READ - GET
// Read All
app.get('/api/fruits', (req, res) => {
  res.status(200).send({ message: 'List of all fruits!', fruits: fruitsDB });
});

// Read One
app.get('/api/fruits/:id', (req, res) => {
  // Access the id param
  const { id } = req.params;

  // Validate is an existing fruit in DB
  const fruit = fruitsDB[id];
  if (!fruit) {
    return res.status(404).send({ message: 'Sorry, fruit not found' });
  }

  // Response
  res.status(200).send({ message: 'Here is your fruit!', fruit });
});

// UPDATE - PUT
app.put('/api/fruits/:id', (req, res) => {
  // Validate user is logged in by checking cookie is set
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  // Validate body properties are provided
  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to update a fruit' });
  }

  // Access the id param
  const { id } = req.params;

  // Validate is an existing fruit in DB
  let fruit = fruitsDB[id];
  if (!fruit) {
    return res.status(404).send({ message: 'Sorry, fruit not found' });
  }

  // Validate the fruit belongs to the current logged in user
  const fruitBelongsToUser = fruit.userId === userId;
  if (!fruitBelongsToUser) {
    return res.status(404).send({ message: 'You are not the owner' });
  }

  // Update the fruit object in DB
  fruitsDB[id] = {
    id,
    name,
    color,
    emoji,
    userId
  };

  // Response
  res.status(201).send({ message: 'Updated!', fruit: fruitsDB[id] });
});

// DELETE - DELETE
app.delete('/api/fruits/:id', (req, res) => {
  // Validate user is logged in by checking cookie is set
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  // Access the id param
  const { id } = req.params;

  // Validate is an existing fruit in DB
  let fruit = fruitsDB[id];
  if (!fruit) {
    return res.status(404).send({ message: 'Sorry, fruit not found' });
  }

  // Validate the fruit belongs to the current logged in user
  const fruitBelongsToUser = fruit.userId === userId;
  if (!fruitBelongsToUser) {
    return res.status(404).send({ message: 'You are not the owner' });
  }

  // Deletes fruit object from DB
  delete fruitsDB[id];
  res.status(204).send();
});

// AUTHENTICATION REST API
// Register
app.post('/api/auth/register', (req, res) => {
  // Validate body properties are provided
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Provide email and password to register ' });
  }

  // Validate email is unique in DB
  const emailExists = usersDB.find(usr => usr.email === email);
  if (emailExists) {
    return res.status(400).send({ message: 'Email already exists' });
  }

  // Generate fruit id
  let id = Math.random()
    .toString(36)
    .substr(2, 3);

  // Generate fruit id
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Generate fruit object
  const newUser = {
    id,
    email,
    password: hashedPassword
  };

  // Adds new user object to the database
  usersDB.push(newUser);
  console.log(usersDB);

  res.send({ message: 'Hello from register!' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  // Validate body properties are provided
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Provide email and password to register ' });
  }

  // Validate user exists with given email
  const user = usersDB.find(usr => usr.email === email);
  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  // Validate provided password is the same as the stored hashed from user in DB
  const passwordsMatch = bcrypt.compareSync(password, user.password);
  if (!passwordsMatch) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

  // Create cookie called userId
  req.session.userId = user.id;

  res.send({ message: 'Welcome!' });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  // Validate user is logged in by checking cookie is set
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  req.session = null;
  res.send({ message: 'Logged out!' });
});

// Catch all route
app.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});

// ----------------------- LISTENER
app.listen(port, () => console.log(`Example app listening on port ${port}`));
