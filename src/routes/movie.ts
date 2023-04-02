import express, {Request, Response, NextFunction} from 'express';
import {
    //CreateMovies, 
    //deleteMovies, 
    getMovies, 
    updateMovie} from "../movieController/movieController"
import {auth} from "../middleware/auth"
const router = express.Router();

// router.post('/create', auth, CreateMovies);

router.get('/allmovies', getMovies);

router.put('/update-movies/:id', auth, updateMovie);

// router.delete('/delete-movies/:id', auth, deleteMovies);





export default router;


