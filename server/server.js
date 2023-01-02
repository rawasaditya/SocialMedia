const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');
const { isAuth } = require('./controllers/auth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000
var cookieParser = require('cookie-parser');


mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOURL)
    .then(() => console.log("DB CONNECTED"))
    .catch(err => {
        console.err(err)
    });
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.use(isAuth)
app.use(express.static('static'))

// Restricted Auths
readdirSync("./routes").map(r => {
    app.use("/api", require(`./routes/${r}`))
})

app.listen(PORT, () => {
    console.log("Connected")
})
