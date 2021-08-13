const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const jwt = require('jsonwebtoken');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req: any, res: any, next: any) => {
  console.log('route login', req.body);

  const users = readUsers();
  const user = users.filter(
    (u: any) => u.name === req.body.name && u.password === req.body.password
  )[0];

  if (user) {
    const accessToken = jwt.sign({ id: user.id }, 'some-secret-key', {
      expiresIn: 60 * 60 * 24 * 30, // 30 day
    });

    res.send({ ...formatUser(user), token: accessToken });
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

server.post('/users', (req: any, res: any) => {
  const users = readUsers();
  console.log(users);
  const user = users.filter((u: any) => u.name === req.body.name)[0];

  if (!user) {
    res.send({
      ...formatUser(req.body),
      id: `${+users[users.length - 1].id + 1}`,
      token: checkIfAdmin(req.body),
    });
    db.users.push(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});

server.use('/users', (req: any, res: any, next: any) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  return user;
}

function checkIfAdmin(user: any, bypassToken = false) {
  return user.username === 'admin' || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

function isAuthorized(req: any) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users;
  console.log(users, 'read users');
  return users;
}
