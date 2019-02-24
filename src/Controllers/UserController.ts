import * as mongoose from 'mongoose';
import * as ExpressSession from "express-session";
import * as crypto from 'crypto';
import { Request, Response } from 'express';

import { UserSchema } from '../Models/UserModel';
import { verify } from 'password-hash';

const User = mongoose.model('user', UserSchema);

export default new class UserController{

    public addNewUser (req: Request, res: Response) {                
        let newUser = new User(req.body);
        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }    
            res.json(user);
        });
    }

    public getUsers (req: Request, res: Response) {           
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithID (req: Request, res: Response) {
        console.log(req.params);           
        User.findById(req.params.userId, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser (req: Request, res: Response) {           
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public deleteUser (req :Request, res :Response) {           
        User.remove({ _id: req.params.userId }, (err) => {
            if(err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted contact!'});
        });
    }  
    
        
    public getAuth (req: ExpressSession.Request, res: Response) {
        if(req.query.email != "" && req.query.password !=""){
            User.findOne( {email:req.query.email} ).exec(function (err, user:{password:string,email:string}) {
                if (err){ res.send(err)}
                if(verify( req.query.password , user.password )){
                    var token = crypto.randomBytes(64).toString('hex');
                    console.log(token)
                    req.session['token'] = token;
                    res.send(token);
                }else{
                    req.session['auth'] = "false";
                    res.redirect('/login?auth=fail');
                }
            });                
        }  
        else{
            req.session['auth'] = "false";
            res.redirect('/login?auth=fail');
        }
    }
}