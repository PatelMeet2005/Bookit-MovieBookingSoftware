require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const AuthRouter = require('./Routers/AuthRouter');
const ContactusRouter = require('./Routers/ContactusRouter');
const TheaterRouter = require('./Routers/TheaterRouter');
const ShowRouter = require('./Routers/ShowRouter');
const AdminAddMoviesRouter = require('./Routers/AdminAddMoviesRouter');
const BookMovieRouter = require('./Routers/BookMovieRouter');


const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(express.json());

app.use(session({
    secret : "Th1sIs@Str0ngJWT$3cretKey128%",
    resave : false,
    saveUninitialized : false,
    cookie : {secure:false}
}));

app.use('/Auth',AuthRouter);
app.use('/query',ContactusRouter);
app.use('/theater',TheaterRouter);
app.use('/show',ShowRouter);
app.use('/adminaddmovies',AdminAddMoviesRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/moviedbbook', BookMovieRouter);


mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>console.log("DataBase Connected!"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Your Port us running at ${PORT}`));