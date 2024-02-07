import bcrypt from "bcrypt";

import User from "../models/User";

import { createUserParams } from "../definitions";
import sendRegistrationVerificationMail from "./EmailService";
class UserService {
    async getAllUsers(){
        try {
            return await User.findAll();
        } catch (e){
            throw new Error(e);
        }
    }
    async createUser(body: createUserParams) {
        try {
            const { firstName, lastName, password, email} = body;
            const hashedPassword= await bcrypt.hash(password, 7);

            console.log(firstName, lastName, email, password);

            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            });

            await sendRegistrationVerificationMail(email);

            return newUser;
        } catch (e){
            throw new Error(e);
        }
    }
}

export default new UserService();