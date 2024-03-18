import { usersControllers } from "../controllers/users.controller";
import { validateMongooseId } from "../middlewares/mongoose";
import {validateUser} from '../middlewares/userValidate'
import { userValidation } from "../schema/userValidation.schema";
import express from 'express'


const Schema = userValidation;
const Route = express.Router()

  // get all users
  Route.get('/', usersControllers.getUsers);
  //get one user
  Route.get(`/:id`, validateMongooseId, usersControllers.getUserById);

  //create user
  Route.post('/', validateUser(Schema), usersControllers.createUsers);

  //update user
  Route.patch(`/:id`, validateMongooseId, usersControllers.updateUser);

  //delete user
  Route.delete(`/:id`, validateMongooseId, usersControllers.deleteUser);



export {Route}