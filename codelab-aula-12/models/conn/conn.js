const mongoose = require('mongoose');

function Conn(url, porta, banco){
    mongoose.connect(`mongodb+srv://dbAdmin:2xIkI0mj360mByWa@blue-db.mtq9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.error(err);
    });
}

module.exports = Conn;