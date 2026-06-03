import express from 'express';
import { handlerSignin, login } from '../controllers/authcontroller.js';

const authrouter=express.Router();


authrouter.post("/signup",handlerSignin)
authrouter.post("/login",login);

export default authrouter;