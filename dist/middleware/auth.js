"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
/* ********************* API LOGIC *************************** */
// export async function auth (req: Request | any, res: Response, next: NextFunction) {
//     try {
//         // const authorization = req.headers.authorization;
//         const authorization = req.cookies.token;
//         if (!authorization){
//             return res.status(401).json({error: "Kindly sign in as a user"})
//         }
//         // const token = authorization.slice(7, authorization.length);
//         let verified = jwt.verify(authorization, jwtsecret);
//         if (!verified){
//             return res.status(401).json({error: "Token invalid, sign in with the right credentials"})
//         }
//         const {id} = verified as {[key: string] : string}
//         const user = await UserInstance.findOne({where: {id}})
//         if (!user) {
//             return res.status(401).json({error: "User not found, please register/sign in"})
//         }
//         req.user = verified
//         next()
//     } catch (error) {
//         res.status(401).json({error: "User Unauthorized"})
//     }
// }
/* ********************* EJS API LOGIC *************************** */
async function auth(req, res, next) {
    try {
        // const authorization = req.headers.authorization;
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.redirect('/login');
        }
        // const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res.redirect('/login');
        }
        const { id } = verified;
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.redirect('/login');
        }
        req.user = verified;
        res.locals.user = user; // add user object to res.locals
        next();
    }
    catch (error) {
        return res.redirect('/login');
    }
}
exports.auth = auth;
