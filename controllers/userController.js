const Users = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Photos = require("../models/productModel.js");

const createUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log("ERROR:::", error);

    let errors2 = {};

    if (error.code === 11000) {
      errors2.email = "The email is already registered.";
    }

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

    console.log("ERRORS", errors2);

    res.status(400).json(errors2);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    let same = false;

    if (user) {
      same = await bcrypt.compare(password, user.password);
    } else {
      return res.status(401).json({ message: "There is no such user !" });
    }

    if (same) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.redirect("/users/dashboard");
    } else {
      res.status(401).json({ message: "Passwords are not matched !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const getDashboardPage = async (req, res) => {
  const photos = await Photos.find({ user: res.locals.user._id });
  const user = await Users.findById({ _id: res.locals.user._id }).populate([
    "followers",
    "followings",
  ]);

  res.status(200).render("dashboard", {
    link: "dashboard",
    photos,
    user,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({ _id: { $ne: res.locals.user._id } });
    res.status(200).render("users", { users, link: "users" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAUser = async (req, res) => {
  try {
    const user = await Users.findById({ _id: req.params.id });

    const inFollowers = user.followers.some((follower) => {
      return follower.equals(res.locals.user._id);
    });

    const photos = await Photos.find({ user: user._id });
    res
      .status(200)
      .render("user", { user, photos, link: "users", inFollowers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const follow = async (req, res) => {
  try {
    let user = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { followers: res.locals.user._id },
      },
      { new: true }
    );

    user = await Users.findByIdAndUpdate(
      { _id: res.locals.user._id },
      {
        $push: { followings: req.params.id },
      },
      { new: true }
    );

    res.status(200).redirect(`/users/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollow = async (req, res) => {
  try {
    let user = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: res.locals.user._id },
      },
      { new: true }
    );

    user = await Users.findByIdAndUpdate(
      { _id: res.locals.user._id },
      {
        $pull: { followings: req.params.id },
      },
      { new: true }
    );

    res.status(200).redirect(`/users/${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getDashboardPage,
  getAllUsers,
  getAUser,
  follow,
  unfollow,
};
