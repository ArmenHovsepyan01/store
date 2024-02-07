import { Request, Response } from 'express';
import userServices from "../services/UserService";

class UserController {
    async getAllUsers(req: Request, res: Response){
        try {
          const users = await userServices.getAllUsers();
          res.send(users);
        } catch (e) {
            throw new Error(e);
        }
    }
    async createUser(req: Request, res: Response){
        try {
            const newUser = await userServices.createUser(req.body);
            res.send(newUser);
        } catch (e) {
            res.status(500).send(`Server error:: ${e.message})`);
        }
    }
}

export default new UserController();