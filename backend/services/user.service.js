const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const httpStatus = require("http-status")

const getUserByEmail = async (email) => {
    const theUser = await User.findOne({ email });
    return theUser;
}

const createUser = async (data) => {
    if (await User.isEmailTaken(data.email)) {
        throw new ApiError(httpStatus.CONFLICT, "Email already taken");
    }
    if (!data.name) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Name is not allowed to be empty");
    }
    if (!data.email) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is not allowed to be empty");
    }

    if (!data.password) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Password field is required");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = await User.create({ ...data, password: hashedPassword });
    return user
}






module.exports = { getUserByEmail, createUser }
