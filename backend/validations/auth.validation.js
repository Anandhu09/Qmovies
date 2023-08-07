const Joi = require("joi");
const { objectId,password } = require("./custom.validation.js");

const register = {
  body: Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  })
};

const login = {
  body:Joi.object().keys({
    email:Joi.string().required().email(),
    password:Joi.string().required()
  })
};


const movieSchema = {
  body:Joi.object().keys({
  Title: Joi.string().required(),
  Year: Joi.number(),
  Rated: Joi.string(),
  Released: Joi.string(),
  Runtime: Joi.string(),
  Genre: Joi.string(),
  Director: Joi.string(),
  Writer: Joi.string(),
  Actors: Joi.string(),
  Plot: Joi.string(),
  Language: Joi.string(),
  Country: Joi.string(),
  Awards: Joi.string(),
  Poster: Joi.string().uri(),
  Ratings: Joi.array().items(
    Joi.object({
      Source: Joi.string(),
      Value: Joi.string(),
    })
  ),
  Metascore: Joi.string(),
  imdbRating: Joi.string(),
  imdbVotes: Joi.string(),
  imdbID: Joi.string(),
  Type: Joi.string(),
  DVD: Joi.string(),
  BoxOffice: Joi.string(),
  Production: Joi.string(),
  Website: Joi.string(),
  Response: Joi.string(),
  totalSeasons:Joi.string()

})};

const move = {
  body:Joi.object().keys({
    Id:Joi.string().custom(objectId),
  })
};

module.exports = {
  register,
  login,
  movieSchema,move
};