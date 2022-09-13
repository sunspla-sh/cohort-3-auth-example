const Express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authExample')
  .then(x => console.log('successfully connected to database ' + x.connections[0].name))
  .catch(err => {
    console.log(err)
  })

const app = Express();

app.set('views', __dirname + '/views');
app.set('view engine', hbs);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));


//setting up my authentication routes
const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);


app.listen(3000, () => console.log('yo the server is running'));