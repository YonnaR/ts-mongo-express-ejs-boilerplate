import * as express from "express";
import HomeController from "../Controllers/HomeController";

var AppRouter :express.Router = express.Router()

AppRouter.get("/",HomeController.index)

export default AppRouter