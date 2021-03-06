const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./connections/db.js');
dotenv.config();
const app = express();

const routerUsers = require('./routes/users.js');
const tasksRouts = require('./routes/db_routes.js');
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use('/users', routerUsers);
app.use('/tasks', tasksRouts);




app.listen(process.env.PORT || 8080, () => console.log(`running on port : ${process.env.PORT || 8080}`));