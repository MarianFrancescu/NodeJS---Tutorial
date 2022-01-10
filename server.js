const {response} = require('express');
const express = require('express');
const routes = require('./routes/router');
const port = 8080;
const app = express();
const router = express.Router();
routes(router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);

app.listen(port, () => console.log("Listening ", port));