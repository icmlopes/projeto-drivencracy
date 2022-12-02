import joi from 'joi';


export const pollSchema = joi.object({
    title: joi.string().min(6).required(),
    expireAt: joi.string().required().allow("")
})