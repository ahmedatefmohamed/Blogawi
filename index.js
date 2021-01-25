require("dotenv").config();
const express= require('express');
const mongoose= require('mongoose');
const routers= require('./routers');

const app= express();

const {MONGODB_URI} = process.env
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true })
.then(() => console.log('Database Connected Successfully'))
.catch((err) => console.log(err));

//PARSING STRING IN BODY TO JSON OBJECT.
app.use(express.json());
//INTIALIZING ROOT ROUTERS BY USING /
app.use('/', routers);
//HANDLING ANY UNMATCHED ROUTES SENDED BY USERS WITH ERROR STATUS= '404'
app.use('*', (req, res, next)=> {
    res.status(404).json({ error: 'ROUTE_NOT_FOUND'})
});
//ERRORS MAPING, THEN PASSING IT TO USERS.
app.use((err, req, res, next)=> {

  console.error(err);
    // instanceof -> Check if this err is a mongoose err
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).end();
});

const { PORT= 3000 }= process.env;
app.listen(PORT, ()=> {
    console.log("APP IS UP AND READY ON: ", PORT);
});