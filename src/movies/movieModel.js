const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        unique: true, 
    },
    actor: {
        type: String,
        default: "Not Specified",
    },
});

const Movie = mongoose.model("Netflix", movieSchema); 

module.exports = Movie
//Mongoose is an Object Document Mapping
//organization or structure for a database 
//Essentially, mongoose is a library that allows you to pass documents to a DBMS
//defining the structure of your documents and the types of data you're storing
//Everything in Mongoose starts with a Schema. 
//Each schema maps to a MongoDB collection and 
//defines the shape of the documents within that collection.