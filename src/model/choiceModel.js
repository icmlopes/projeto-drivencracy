import joi from 'joi';

export const choiceSchema = joi.object({
    title: joi.string().min(4).required(),
    pollId: joi.string()
})