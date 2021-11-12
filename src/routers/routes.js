import express from "express";
const api = express.Router();

import {signup, signin} from "../controllers/AuthController.js";

api.post("/signup", signup);
api.post("/signin", signin);

export default api;
