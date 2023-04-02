import express, {Response, Request, NextFunction} from 'express';
import { auth } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';
import { MovieInstance } from '../model/movieModels';
import { createMovieSchema, options } from '../utils/utils';
import { UserInstance } from '../model/userModel';

const router = express.Router()


/* GET home page. */
router.get('/', async (req: Request, res: Response) => {
  const getAllMovies = await MovieInstance.findAll({
  });
  return res.render('index', {movieList: getAllMovies})
})

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
router.get('/update', auth, async(req: Request | any, res:Response) => {
  try {
    const {id, username} = req.user;
    const {movie} = await UserInstance.findOne({where: {id}, include: {
      model: MovieInstance,
      as: "movie",
    }}) as unknown as any
    
    return res.render("update", {
      movieList: movie,
      user: res.locals.user
    })
  } catch (error) {
    console.log(error)
  }
})



router.get('/register', function(req: Request, res: Response) {
  res.render("register");
});

router.get('/login', function(req: Request, res: Response, next: NextFunction) {
  res.render("login");
});

router.get('/home', function(req: Request, res: Response, next: NextFunction) {
  res.render("home");
});

//Post Request

router.post('/update', auth, async (req: Request | any, res:Response ) => {
  try {
      const verified = req.user;
      const id = uuidv4();
      const {title, description, image, price} = req.body;
      const validateResult = createMovieSchema.validate(req.body, options)

      if(validateResult.error){
          return res.redirect("/update")
      }
      const movieRecord = await MovieInstance.create({
          id,
          title, 
          description, 
          image, 
          price,
          userId: verified.id
      })
      console.log(movieRecord)
      return res.redirect("/update")
  } catch (error) {
      console.log(error)
  }
})



// Delete Movie

router.get("/update/:id", auth, async (req: Request, res: Response) => {
  try {
      const {id} = req.params;
      const record = await MovieInstance.findOne({where:{id}})
      if(!record){
          return res.render("update", {error: "Cannot find any movie"})
      }
     await record.destroy();
      return res.redirect('/update')
  } catch (error) {
      console.log(error)
      
  }
})

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

export default router