require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const contactsRouter = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 5000;

const { MONGO_URL: mongoUrl } = process.env;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/contacts', contactsRouter);

mongoose.connect(mongoUrl,
{ useNewUrlParser: true, useUnifiedTopology: true });

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});
