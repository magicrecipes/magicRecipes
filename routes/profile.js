require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const activate = require(`../middlewares/activeMid`);