const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept, Authorization");
    next();
});

mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://ytai:ytai@cluster0.tazcu.gcp.mongodb.net/genesis?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', function(req, res) {
    res.send(`Hello my name is Dayana Ytai Barrios Rocha and it is my firt server using nodejs running on port ${port}!`)
});

app.use('/product', productRoute);
app.use('/user', userRoute);

app.listen(port, function() {
    console.log(`Hello my name is Dayana Ytai Barrios Rocha and it is my firt server using nodejs running on port ${port}!`)
});