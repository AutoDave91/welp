let {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

require('dotenv').config();
const express = require('express');
const massive= require('massive');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();


const {
    getReviews,
    deleteReview,
    createReview,
    updateReview
} = require('./controllers/reviewController')





//Endpoints//

//Reviews
app.get('/api/reviews', getReviews);
app.delete('/api/reviews/:reviews_id', deleteReview);
app.post('/api/reviews', createReview);
app.put('/api/reviews', updateReview)


//W.O.S







app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 3
    }

})
)
 

//database connected//
massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("Database connected");
});

app.listen(SERVER_PORT, () => {
    console.log("Server listening on port 5050")
})