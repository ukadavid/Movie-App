"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovies = void 0;
const movieModels_1 = require("../model/movieModels");
const utils_1 = require("../utils/utils");
// export const CreateMovies = async (req: Request | any, res:Response ) => {
//     try {
//         const verified = req.user;
//         const id = uuidv4();
//         const {title, description, image, price} = req.body;
//         const validateResult = createMovieSchema.validate(req.body, options)
//         if(validateResult.error){
//             return res.status(400).json({error: validateResult.error.details[0].message})
//         }
//         const movieRecord = await MovieInstance.create({
//             id,
//             title, 
//             description, 
//             image, 
//             price,
//             userId: verified.id
//         })
// return res.status(201).json({
//     msg: "Movie created successfully",
//     movieRecord
// })
//     } catch (error) {
//         console.log(error)
//     }
// }
// This is for the index page
const getMovies = async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query?.offset;
    const getAllMovies = await movieModels_1.MovieInstance.findAll({
        limit: limit,
        offset: offset
    });
    return res.status(200).json({
        message: "All movies retrieved successfully",
        getAllMovies
    });
};
exports.getMovies = getMovies;
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        const validateResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res.status(400).json({ error: validateResult.error.details[0].message });
        }
        const updateMovies = await movieModels_1.MovieInstance.findOne({ where: { id } });
        if (!updateMovies) {
            return res.status(400).json({ error: "Movie not found" });
        }
        const updateRecord = await updateMovies.update({
            title,
            description,
            image,
            price
        });
        return res.status(200).json({
            message: "Movie updated successfully",
            updateRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateMovie = updateMovie;
