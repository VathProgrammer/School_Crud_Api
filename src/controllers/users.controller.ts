import { NextFunction, Request, Response } from "express";
// import { User } from "../types/users";
import { BaseCustomError } from "../utils/baseCustomError";
import { UserType } from "../schema/userValidation.schema";
import { StatusCode } from "../utils/consts";
const UserModel = require("../models/users.model");

export const usersControllers = {
  getUsers: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const usersData: UserType = await UserModel.find({});
      res.json({ data: usersData });

      if (!usersData) {
        throw new Error("No data found!");
      }

      //get time user request
    } catch (error: unknown | any) {
      _next(new BaseCustomError(error.message, StatusCode.InternalServerError));
    }
  },

  getUserById: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;

      const userData: UserType = await UserModel.findById(id);

      if (!userData) {
        throw new Error("no user Found");
      }

      res.status(200).json({
        message: 'found success',
        data: userData,
      });
    } catch (error: unknown | any) {
      _next(new BaseCustomError(error.message, StatusCode.InternalServerError));
    }
  },

  createUsers: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const userData: UserType = {
        username: req.body.username,
        age: req.body.age,
      };

      const user = await UserModel(userData);
      user.save();

      if (!user) {
        throw new Error("user not created!");
      }

      res.status(201).json({
        message: "success",
        data: user,
      });
    } catch (error: unknown | any) {
      _next(new BaseCustomError(error.message, StatusCode.InternalServerError));
    }
  },

  updateUser: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const data: UserType = {
        username: req.body.username,
        age: req.body.age,
      };

      await UserModel.findByIdAndUpdate(id, data);
      const updated = await UserModel.findById(id);

      if (!updated) {
        throw new Error("user could be not updated!");
      }

      res.json({
        message: "updated success",
        data: updated,
      });
    } catch (error: unknown | any) {
      _next(new BaseCustomError(error.message, StatusCode.InternalServerError));
    }
  },

  deleteUser: async (
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await UserModel.deleteOne({ _id: id });
      res.json({
        message: "Delete successfully!",
        error: false,
      });
    } catch (error: unknown | any) {
      _next(new BaseCustomError(error.message, StatusCode.InternalServerError));
    }
  },
};
