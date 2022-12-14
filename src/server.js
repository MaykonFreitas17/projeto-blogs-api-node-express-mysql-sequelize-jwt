require('dotenv').config();

const app = require('./api');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

const LoginRouter = require('./routes/LoginRouter');
const UserRouter = require('./routes/UserRouter');
const CategoriesRouter = require('./routes/CategoriesRouter');
const PostsRouter = require('./routes/PostsRouter');

app.use('/login', LoginRouter);
app.use('/user', UserRouter);

app.use('/categories', CategoriesRouter);

app.use('/post', PostsRouter);

app.listen(port, () => console.log('ouvindo porta', port));
