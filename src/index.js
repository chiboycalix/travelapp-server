const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

const middleware = require('./middlewares')
const logs = require('./api/logs')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
app.use(morgan('common'))
app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello'
  })
});

app.use('/api/logs', logs);
app.use(middleware.notFound)
app.use(middleware.errorHandler)



const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
