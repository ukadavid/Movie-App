"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../movieController/movieController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// router.post('/create', auth, CreateMovies);
router.get('/allmovies', movieController_1.getMovies);
router.put('/update-movies/:id', auth_1.auth, movieController_1.updateMovie);
// router.delete('/delete-movies/:id', auth, deleteMovies);
exports.default = router;
