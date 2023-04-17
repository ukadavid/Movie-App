"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtsecret = process.env.JWT_SECRET;
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
const Register = async (req, res) => {
    try {
        const { email, username, fullName, password, confirmPassword } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //validate with Joi 
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render('register', { error: validationResult.error.details[0].message });
        }
        //hash passwords
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        //generate salt and hash password
        //create user
        //---check if the user already exists
        const user = await userModel_1.UserInstance.findOne({ where: { email: email } });
        if (!user) {
            let newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                email,
                fullName,
                password: passwordHash,
                username
            });
            //Generate token for the user
            const User = await userModel_1.UserInstance.findOne({
                where: { email: email }
            });
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
            return res.redirect('/login');
        }
        res.render('register', { error: "Email already exists" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate with Joi 
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render('login', { error: validationResult.error.details[0].message });
        }
        const User = await userModel_1.UserInstance.findOne({
            where: { email }
        });
        if (!User) {
            return res.render("login", { error: "Invalid email/password" });
        }
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            return res.redirect('/update');
        }
        else {
            return res.render("login", { error: "Invalid email/password" });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};
exports.Logout = Logout;
