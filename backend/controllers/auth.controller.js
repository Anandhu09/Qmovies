const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService, playlistService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({ user, tokens })
});


const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(200).json({ user, tokens });
});


const addMovieToPlaylist = catchAsync(async (req, res) => {
  const movie = await playlistService.addMovieToPlaylist(
    req.user,
    req.body
  );
  res.status(httpStatus.CREATED).send(movie);
});

const getPlaylist = catchAsync(async (req, res) => {
  const lists = await playlistService.getPlaylistByUser(req,res);
  res.send(lists);
});

const MoveToPrivate = catchAsync(async(req,res)=>{
  const removedMovie = await playlistService.MoveToPrivate(req);
  res.status(httpStatus.CREATED).send(removedMovie)
})

const MoveToPublic = catchAsync(async(req,res)=>{
  const removedMovie = await playlistService.MoveToPublic(req);
  res.status(httpStatus.CREATED).send(removedMovie)
})



module.exports = {
  register,
  login,
  addMovieToPlaylist,
  getPlaylist,
  MoveToPrivate,
  MoveToPublic,
};