const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const app = express();

app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:4000'
}));

app.get('/', (req, res) => {
  res.json({
    message: 'hello'
  })
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env === 'production' ? '🔻' : error.stack
  })
});



const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})