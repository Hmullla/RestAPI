const Movie = require("./movieModel");


//covers all CRUD functionality C-create, R-read, U-update, D-delete
exports.createMovie = async (req, res) => {
    try {
        if (req.body.title && req.body.actor){
            console.log(req.body)
            await Movie.create({title: req.body.title, actor: req.body.actor});
            res.status(201).send({message: "Movie sucessfully created"});
        }
        else {
            console.log("Title or actor not found");
            res.status(400).send({error: "Title or actor not found"});
        }
    } catch (error) {
        console.log("Error in createMovie function");
        res.status(500).send({ error: "server error" });
        console.log(error);
    }
}

exports.listMovies = async (req, res) => {
    try {
        const movieList = await Movie.find({})
        if (movieList.length > 0){
            res.status(200).send({ message: "Movies successfully retrieved from database" ,movieList });
        }
        else {
            res.status(400).send({ error: "No movies in database to display" });
        }
    } catch (error) {
        console.log("Error in listMovies function");
        res.status(500).send({ error:"server error"});
        console.log(error);
    }
}

exports.updateMovie = async (req, res) => {
    try {
        await Movie.updateOne({ title: req.body.title, actor: req.body.actor });
        res.status(400).send({ message: "Movie succesfully updated" });
    } catch (error) {
        console.log("Error in updateMovie function");
        res.status(500).send({ error: error.message });
        console.log(error);
    }
}

//only deletes one movie
exports.deleteMovie = async (req, res) => {
    try {
        const movieList = await Movie.find({})
        const T = req.body.title;
        const A = req.body.actor;
        console.log(movieList)
        if ((T && A) && movieList.length > 0){
            await Movie.deleteOne({ title: T, actor: A });
            res.status(200).send({movieList});
        }
        else {
            console.log("There is nothing to delete");
            res.status(400).send({error: "an error has occured"});
        }
    } catch (error) {
        console.log("Error in deleteMovie function");
        res.status(500).send({error:"server error"});
        console.log(error);
    }
}

//deletes multiple/all movies
exports.deleteMultipleMovies = async (req, res) => {
    try {
        const movieList = await Movie.find({})
        if (movieList.length > 0){
            await Movie.deleteMany({movieList})
            res.status(200).send("Contents deleted");
        }
        else {
            console.log("There is nothing to delete");
            res.status(400).send({error: "an error has occured"});
        }
    } catch (error) {
        console.log("Error in deleteMultipleMovies function");
        res.status(500).send({error:"server error"});
        console.log(error);
    }
}