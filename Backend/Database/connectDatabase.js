const mongoose = require('mongoose');

const connectDatabase = () => {
 
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Connected"))
    .catch(()=>console.log("Not Connected"))
}


module.exports = connectDatabase;