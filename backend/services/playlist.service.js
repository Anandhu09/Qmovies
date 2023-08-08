const httpStatus = require("http-status");
const { Playlist } = require("../models");
const ApiError = require("../utils/ApiError");

const getPlaylistByUser = async (req, res) => {
  let lists;
  if (req.params.e) {
    lists = await Playlist.findOne({ email: req.params.e })
  }
  if (req.query.u) {
    lists = await Playlist.findOne({ email: req.query.u })
  }
  if (!lists) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Playlist Found")
  }
  return lists;
};

const addMovieToPlaylist = async (user, body) => {
  let movie = await Playlist.findOne({ email: user.email });
  if (!movie) {
    try {
      movie = await Playlist.create({
        email: user.email,
        publicPlaylists: [],
        privatePlaylists: []
      });
      await movie.save();
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Movie added to playlist failed");
    }
  }

  if (movie.publicPlaylists.some((item) => item.Title === body.Title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Movie already in  public playlist.")
  }
  if (movie.privatePlaylists.some((item) => item.Title === body.Title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Movie already in private playlist.")
  }
  movie.publicPlaylists.push(body)

  await movie.save();
  return movie;

};

const MoveToPrivate = async (req) => {
  try {
    let movie = await Playlist.findOne({ email: req.user.email });
    const movieIndex = movie.publicPlaylists.findIndex((movie) => movie._id.toString() === req.body.Id);

    if (movieIndex === -1) {
      throw new ApiError(httpStatus.NOT_FOUND,"Movie not found in Private Playlists.")
    }
    const removedMovie = movie.publicPlaylists.splice(movieIndex, 1)[0];
    movie.privatePlaylists.push(removedMovie)
    await movie.save();
    return movie
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error moving document.'");
  }
}

const MoveToPublic = async (req) => {
  try {
    let movie = await Playlist.findOne({ email: req.user.email });
    const movieIndex = movie.privatePlaylists.findIndex((movie) => movie._id.toString() === req.body.Id);

    if (movieIndex === -1) {
      throw new ApiError(httpStatus.NOT_FOUND,"Movie not found in Public Playlists.")
    }
    const removedMovie = movie.privatePlaylists.splice(movieIndex, 1)[0];

    movie.publicPlaylists.push(removedMovie)
    await movie.save();
    return movie
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "Error moving document.'");
  }
}


module.exports = {
  addMovieToPlaylist,
  getPlaylistByUser,
  MoveToPrivate,
  MoveToPublic
};
