import { UserType } from "../../schema/userValidation.schema";
const userModel = require("../models/users.model")

class UsersRepository {
    static updateUser: any;
    // static updateUser: any;
  
    async getUserById (id: string) {
        return await  userModel.findById(id)
    }
    
    async getUsers (){
        return await userModel.find()   
    }

     async createUser (user: UserType | null){
        const userCreated = await userModel(user)
        return userCreated.save()
    }

    public  async updateUser (id: string, user: UserType | null){
        return await userModel.findByIdAndUpdate({_id: id}, user)
    }

    async deleteOneUser (id: string){
        return await userModel.deleteOne({_id: id});
    }

    async deleteAllUsers (){
        return await userModel.deleteMany({});
    }
}

export {UsersRepository}