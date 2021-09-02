const mongoose = require('mongoose');

function Conn(url, porta, banco){
    mongoose.connect(`mongodb://${url}:${porta}/${banco}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = Conn;