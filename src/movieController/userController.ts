import {Request, Response} from 'express';
import { UserInstance } from '../model/userModel';
import { v4 as uuidv4 } from 'uuid';
import { registerUserSchema, options, loginUserSchema } from '../utils/utils';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtsecret = process.env.JWT_SECRET as string;


// /* ***************** API LOGIC ************/

// export const Register = async (req: Request, res: Response) => {
//     try {
  
//         const {email, username, fullName, password, confirmPassword} = req.body;
//         const iduuid = uuidv4(); 
//         //validate with Joi 
//         const validationResult = registerUserSchema.validate(req.body, options)
  
//         if(validationResult.error){
//             return res.status(400).json({error: validationResult.error.details[0].message})
//         }
        
//         //hash passwords
//         const passwordHash = await bcrypt.hash(password, 8)
//         //generate salt and hash password
  
//         //create user
//         //---check if the user already exists
//         const user = await UserInstance.findOne({where:{email: email}})
//         if(!user){
//             let newUser = await UserInstance.create({
//                 id: iduuid,
//                 email,
//                 fullName,
//                 password: passwordHash,
//                 username
//             })
  
//             //Generate token for the user
  
//             const User = await UserInstance.findOne({
//                 where:{email:email}
//             }) as unknown as {[key: string]:string}
//             const {id} = User
  
  
//             const token = jwt.sign({id},jwtsecret,{expiresIn:"30mins"})

//             res.cookie("token", token, {httpOnly: true, maxAge:30*60*1000})
  
//         return res.status(201).json({
//             msg: "User created successfully",
//             newUser,
//             token
//         })
//         }
//         res.status(409).json({
//             error: "Email already exists"
//         })
  
//     } catch (error) {
//       console.log(error)
//         res.status(500).json({error: "Internal server error"})
//     }
//   } 

// export const Login = async (req: Request, res: Response) => {
//     try {
//         const {email, password} = req.body;
//         //validate with Joi 
//         const validationResult = loginUserSchema.validate(req.body, options)

//         if(validationResult.error){
//             return res.status(400).json({error: validationResult.error.details[0].message})
//         }
//     const User = await UserInstance.findOne({
//         where:{email:email}
//     }) as unknown as {[key : string]:string}

//     const {id} = User

//     const token = jwt.sign({id}, jwtsecret, {expiresIn:"30d"})
//     res.cookie("token", token, {httpOnly: true, maxAge:30 * 24 * 60 * 60 * 1000})

//     const validUser = await bcrypt.compare(password, User.password)

//     if(validUser){
//         return res.status(201).json({
//             message: "User logged in successfully",
//             User,
//             token
//         })
//     }

//     return res.status(400).json({error:"Invalid email/password"})
//     } catch (error) {
//         res.status(500).json({error: "Internal server error"})
//     }
// }

/* ***************** EJS API LOGIC ************/

export const Register = async (req: Request, res: Response) => {
    try {
  
        const {email, username, fullName, password, confirmPassword} = req.body;
        const iduuid = uuidv4(); 
        //validate with Joi 
        const validationResult = registerUserSchema.validate(req.body, options)
  
        if(validationResult.error){
            return res.render('register', {error: validationResult.error.details[0].message})
        }
        
        //hash passwords
        const passwordHash = await bcrypt.hash(password, 8)
        //generate salt and hash password
  
        //create user
        //---check if the user already exists
        const user = await UserInstance.findOne({where:{email: email}})
        if(!user){
            let newUser = await UserInstance.create({
                id: iduuid,
                email,
                fullName,
                password: passwordHash,
                username
            })
  
            //Generate token for the user
  
            const User = await UserInstance.findOne({
                where:{email:email}
            }) as unknown as {[key: string]:string}
            const {id} = User
  
  
            const token = jwt.sign({id},jwtsecret,{expiresIn:"30mins"})

            res.cookie("token", token, {httpOnly: true, maxAge:30*60*1000})
  
        return res.redirect('/login')
        }
        res.render('register', {error: "Email already exists"});
  
    } catch (error) {
      console.log(error)
    }
  } 

  export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        //validate with Joi 
        const validationResult = loginUserSchema.validate(req.body, options);

        if (validationResult.error) {
            return res.render('login', { error: validationResult.error.details[0].message });
        }

        const User = await UserInstance.findOne({
            where: { email }
        }) as unknown as { id: string, password: string };

        if (!User) {
            return res.render("login", { error: "Invalid email/password" });
        }

        const { id } = User;

        const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });

        res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        const validUser = await bcrypt.compare(password, User.password);

        if (validUser) {
                return res.redirect('/update');
        } else {
            return res.render("login", { error: "Invalid email/password" });
        }
    } catch (error) {
        console.log(error);
    }
}



export const Logout = async (req:Request, res:Response) => {
    res.clearCookie('token');
    res.redirect('/login')
}