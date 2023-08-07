const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config()
const { User } = require("../models");

const jwtOptions = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
};



const jwtVerify = async (payload, done) => {

  try{
    if(payload.type !== process.env.TOKENTYPE){
      return done(new Error("Invalid Token Type"), false);
    }

    if(payload.time > payload.expiry){
      return done(new Error("Token expired, please re-login"), false);
    }
    const user = await User.findById(payload.sub) //payload.user._id 
    if(!user){
      return done(null, false);
    }
    done(null, user);
  } catch(err) {
    return done(err, false);
  }
};
 

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};