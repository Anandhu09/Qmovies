const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true,unique:true },
    Year: { type: Number },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Writer: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Language: { type: String },
    Country: { type: String },
    Awards: { type: String },
    Poster: { type: String },
    Ratings: { type: Array },
    Metascore: { type: String },
    imdbRating: { type: String },
    imdbVotes: { type: String },
    imdbID: { type: String },
    Type: { type: String },
    DVD: { type: String },
    BoxOffice: { type: String },
    Production: { type: String },
    Website: { type: String },
    Response: { type: String },
    totalSeasons:{type:String}

  });

  // const Movie = mongoose.model('Movie', movieSchema);
  // module.exports.Movie = Movie;
  module.exports.movieSchema = movieSchema;