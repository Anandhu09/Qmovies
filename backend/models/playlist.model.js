const mongoose = require('mongoose');
const { movieSchema } = require('../models/movie.model');

const playlistSchema = mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      unique:true
    },
    publicPlaylists:[movieSchema],
    privatePlaylists: {
      type: Array,
      default: [], 
    },
  },
  {
    timestamps: false,
  }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.Playlist = Playlist;