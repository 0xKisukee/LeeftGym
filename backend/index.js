const express = require('express')
const app = express()
const port = process.env.APP_PORT;
const router = require('./src/routes');
// Import error middleware
const { errorHandler } = require("./src/middlewares/errorHandler");
// const cors = require('cors');
// const cron = require('node-cron');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Middleware for JSON requests
app.use(express.json());

// Routes
app.use('/api', router);

// Use error middleware (last middleware so it can catch previous middleware's errors)
app.use(errorHandler);

app.listen(port, '127.0.0.1', () => {
    console.log(`App is listening on port ${port}`)
});