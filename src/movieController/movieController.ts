import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { MovieInstance } from '../model/movieModels';
import { updateMovieSchema, options, createMovieSchema } from '../utils/utils';

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
export const getMovies = async (req: Request, res: Response) => {
    const limit = req.query.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    const getAllMovies = await MovieInstance.findAll({
        limit:limit,
        offset:offset
    });
    return res.status(200).json({
        message: "All movies retrieved successfully",
        getAllMovies
    })
}

export const updateMovie = async (req: Request, res: Response) => {
    try {

        const {id} = req.params;
        const {title, description, image, price} = req.body;
        const validateResult = updateMovieSchema.validate(req.body, options)

        if(validateResult.error){
            return res.status(400).json({error: validateResult.error.details[0].message})
        }

        const updateMovies = await MovieInstance.findOne({where:{id}})

        if(!updateMovies){
            return res.status(400).json({error: "Movie not found"})
        }

        const updateRecord = await updateMovies.update({
            title, 
            description, 
            image, 
            price
        })

        return res.status(200).json({
            message: "Movie updated successfully",
            updateRecord
        })

        
    } catch (error) {
        console.log(error)
    }
}
