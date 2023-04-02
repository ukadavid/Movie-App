"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const uuid_1 = require("uuid");
const movieModels_1 = require("../model/movieModels");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const router = express_1.default.Router();
/* GET home page. */
router.get('/', async (req, res) => {
    const getAllMovies = await movieModels_1.MovieInstance.findAll({});
    return res.render('index', { movieList: getAllMovies });
});
// router.get('/update', auth, async(req: Request | any, res:Response) => {
//   try {
//     const {id} = req.user;
//     const {movie} = await UserInstance.findOne({where: {id}, include: {
//       model: MovieInstance,
//       as: "movie",
//     }}) as unknown as any
//     return res.render("update", {
//       movieList: movie
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })
//Create
router.get('/update', auth_1.auth, async (req, res) => {
    try {
        const { id, username } = req.user;
        const { movie } = await userModel_1.UserInstance.findOne({ where: { id }, include: {
                model: movieModels_1.MovieInstance,
                as: "movie",
            } });
        return res.render("update", {
            movieList: movie,
            user: res.locals.user
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.get('/register', function (req, res) {
    res.render("register");
});
router.get('/login', function (req, res, next) {
    res.render("login");
});
router.get('/home', function (req, res, next) {
    res.render("home");
});
//Post Request
router.post('/update', auth_1.auth, async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        const { title, description, image, price } = req.body;
        const validateResult = utils_1.createMovieSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.redirect("/update");
        }
        const movieRecord = await movieModels_1.MovieInstance.create({
            id,
            title,
            description,
            image,
            price,
            userId: verified.id
        });
        console.log(movieRecord);
        return res.redirect("/update");
    }
    catch (error) {
        console.log(error);
    }
});
// Delete Movie
router.get("/update/:id", auth_1.auth, async (req, res) => {
    try {
        const { id } = req.params;
        const record = await movieModels_1.MovieInstance.findOne({ where: { id } });
        if (!record) {
            return res.render("update", { error: "Cannot find any movie" });
        }
        await record.destroy();
        return res.redirect('/update');
    }
    catch (error) {
        console.log(error);
    }
});
// Update Movie
// Update a movie
// router.post('/update-movie', async (req, res) => {
//   const { id, title, description, price, image } = req.body;
//   try {
//     const movie = await Movie.findByPk(id);
//     if (!movie) {
//       return res.status(404).send('Movie not found');
//     }
//     await movie.update({
//       title: title,
//       description: description,
//       price: price,
//       image: image
//     });
//     res.redirect('/');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// });
exports.default = router;
