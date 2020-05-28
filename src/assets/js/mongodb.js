const mongoose = require('mongoose');

//Connect to mongodb
mongoose.connect('mongodb://localhost/4200');

mongoose.connection.once('open', function(){
    console.log("COnnection has been made. Now make some fireworks...");
}).on('error', function(error){
    console.log("Conncetion Error:", error)
});