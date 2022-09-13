const Express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

mongoose.connect('mongodb://localhost/authExample')
  .then(x => console.log('successfully connected to database ' + x.connections[0].name))
  .catch(err => {
    console.log(err)
  })

const app = Express();



app.set('views', __dirname + '/views');
app.set('view engine', hbs);

// required for the app when deployed to Heroku (in production)
app.set('trust proxy', 1);
 
// use session
app.use(
  session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60000 // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/authExample'
    })
  })
);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));


//setting up my authentication routes
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);


app.listen(3000, () => console.log('yo the server is running'));