import Joi from 'joi';

export const registerUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({'any.only': '{{#label}} does not match' })
})

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
})

export const createMovieSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required()
})

export const updateMovieSchema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    price: Joi.number()
})
